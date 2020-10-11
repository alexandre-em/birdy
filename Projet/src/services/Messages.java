package services;

import java.sql.SQLException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;


public class Messages {
	

	public static JSONObject choixGetMessage(String id, String requete, String filtre, String mur, String search) {
		if (id=="") {
			if(mur!="")
				return getMur(mur);
			else
				if(requete!="")
					return listMessage(requete, filtre);
				else
					try {
						return new JSONObject().put("result", tools.Messages.search(search));
					} catch (JSONException e) {
						return tools.ErrorJSON.serviceRefused(e.getMessage(), "1000");
					}
		} else
			return getMessage(id);
	}
//---------------------------------------------------------------------------------------------------------------------------------------------	

	public static JSONObject deleteMessageRep(String id, String idMsg, String idRep) {
		if (idRep=="") {
			return removeMessage(id, idMsg);
		} else
			return deleteReply(id, idMsg, idRep);
	}
//---------------------------------------------------------------------------------------------------------------------------------------------	

	
	public static JSONObject getMur(String id) {
		try {
			List<String> amis = tools.Friends.getFriendList(id);
			amis.add(id);

			return tools.ErrorJSON.serviceAccepted("message", (tools.Messages.getMur(amis)).toString());
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		}
	}
	
//---------------------------------------------------------------------------------------------------------------------------------------------	
	
	/**
	 * @param id
	 * @return A partir de l'id du message retrouve le message et le retourne
	 */
	public static JSONObject getMessage(String id) {
		String msg;
		try {
			msg = tools.Messages.rechercheMessageId(id);
			return new JSONObject(msg);
		} catch (JSONException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "67");
		}
	}

//---------------------------------------------------------------------------------------------------------------------------------------------
		/**
		 * @param requete (numero id)
		 * @param filtre	("id_author")
		 * @return Le JSON de la liste des messages
		 */
		public static JSONObject listMessage(String requete, String filtre) {
			if (filtre.equals(tools.Messages.msgid))
				try {
					return tools.ErrorJSON.serviceAccepted("message", tools.Messages.rechercheMessageId(requete).toString());
				} catch (JSONException e) {
					return tools.ErrorJSON.serviceRefused(e.getMessage(), "77");
				}
			return tools.ErrorJSON.serviceAccepted("message", (tools.Messages.rechercheMessage(requete, filtre)).toString());
		}

	
//---------------------------------------------------------------------------------------------------------------------------------------------

	public static JSONObject sendMessage(String id, String idmsg, String content, String urlImg) {
		try {
			if(!tools.Authentification.isConnecte(id))
				return tools.ErrorJSON.serviceRefused("user non connecte", "504");
			
			if(idmsg.isEmpty()) {
				return createMessage(id, content, urlImg);
			}
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				return replyMessage(id,idmsg,content, urlImg);
			}else
				tools.Authentification.logout(idmsg);
				return tools.ErrorJSON.serviceRefused("time out", "458");
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		}
	}
	
//---------------------------------------------------------------------------------------------------------------------------------------------

	/**
	 * Creer un message
	 * @param id
	 * @param input
	 * @return le JSON du message
	 */
	public static JSONObject createMessage(String id, String input, String urlImg) {
		try {
			if((!tools.Authentification.isConnecte(id))) {
				return tools.ErrorJSON.serviceRefused("Non Connecte", "07");
			}
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				String s = tools.Messages.createMessage(id, input, urlImg, "");
				return new JSONObject(s);
			}else
				tools.Authentification.logout(id);
				return tools.ErrorJSON.serviceRefused("time out", "458");

		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (JSONException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "45");
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		}
	}

//---------------------------------------------------------------------------------------------------------------------------------------------

	public static JSONObject replyMessage(String id, String idmsg, String content, String imgUrl) {
		try {
			if((!tools.Authentification.isConnecte(id))) {
				return tools.ErrorJSON.serviceRefused("Non Connecte", "07");
			}
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				return new JSONObject(tools.Messages.replyMessage(id, idmsg, content, imgUrl));
			}else
				return tools.ErrorJSON.serviceRefused("time out", "458");
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (JSONException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "46");
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		}
	}
	
//---------------------------------------------------------------------------------------------------------------------------------------------

	public static JSONObject deleteReply(String id, String idMsg ,String idRep) {
		try {
			if((!tools.Authentification.isConnecte(id))) {
				return tools.ErrorJSON.serviceRefused("Non Connecte", "07");
			}
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				removeMessage(id, idRep);
				return new JSONObject(tools.Messages.deleteReply(idMsg, idRep));
			}else
				return tools.ErrorJSON.serviceRefused("time out", "458");
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (JSONException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "46");
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		}
	}
	
//-----------------------------------------------------------------------------------------------------------------------------------------------	
	
	/**
	 * Supprime un message par l'id
	 * @param id
	 * @param msg
	 * @return JSON
	 */
	public static JSONObject removeMessage(String id, String msg) {
		try {
			if(!tools.Authentification.isConnecte(id))
				return tools.ErrorJSON.serviceRefused(id+" non connecte", "07");
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				tools.Messages.checkIdMsg(msg, id);
				String s = tools.Messages.rechercheMessageId(msg);
				JSONObject j = new JSONObject(s);
				String idrep=(String) j.get("origin");
				System.out.println(idrep.isEmpty());
				if (!idrep.isEmpty()) tools.Messages.deleteReply(idrep, msg);
				else tools.Messages.deleteMessage(msg);
				return tools.ErrorJSON.serviceAccepted("remove_message", msg);
			}else {
				tools.Authentification.logout(id);
				return tools.ErrorJSON.serviceRefused("time out", "458");}

		} catch (JSONException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "96");
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		}
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------	


	public static JSONObject setLike(String id, String idmsg) {
		try {
			if((!tools.Authentification.isConnecte(id))) {
				return tools.ErrorJSON.serviceRefused("Non Connecte", "07");
			}if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				return new JSONObject(tools.Messages.setLike(id, idmsg));
			}else {
				tools.Authentification.logout(id);
				return tools.ErrorJSON.serviceRefused("time out", "458");}
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (JSONException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "500");
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		}
	}

	
}