package services;

import java.sql.SQLException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;


public class Messages {
	

	public static JSONObject choixGetMessage(String id, String requete, String filtre, String mur) {
		if (id.isBlank()) {
			if(!mur.isBlank())
				return getMur(mur);
			else
				return listMessage(requete, filtre);
		} else
			return getMur(id);
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

	public static JSONObject sendMessage(String id, String idmsg, String content) {
		try {
			if(!tools.Authentification.isConnecte(id))
				return tools.ErrorJSON.serviceRefused("user non connecte", "504");
			
			if(idmsg.isEmpty()) {
				return createMessage(id, content);
			}
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				return replyMessage(id,idmsg,content);
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
	public static JSONObject createMessage(String id, String input) {
		try {
			if((!tools.Authentification.isConnecte(id))) {
				return tools.ErrorJSON.serviceRefused("Non Connecte", "07");
			}
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				String s = tools.Messages.createMessage(id, input);
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

	public static JSONObject replyMessage(String id, String idmsg, String content) {
		try {
			if((!tools.Authentification.isConnecte(id))) {
				return tools.ErrorJSON.serviceRefused("Non Connecte", "07");
			}
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				return new JSONObject(tools.Messages.replyMessage(id, idmsg, content));
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
				return tools.ErrorJSON.serviceRefused("user non connecte", "07");
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				tools.Messages.checkIdMsg(msg, id);
				tools.Messages.deleteMessage(msg);
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
				tools.Messages.checkIdMsg(idmsg, id);
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