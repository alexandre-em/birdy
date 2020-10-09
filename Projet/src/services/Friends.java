package services;

import java.sql.SQLException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

public class Friends {
	/**
	 * @param id
	 * @return Le JSON de la liste d'ami
	 */
	public static JSONObject getFriendList(String id, String followed) {
		try {
			if(id.isEmpty()) {
				if(!tools.User.existUser(followed))
					return tools.ErrorJSON.serviceRefused("user n'existe pas", "55");
				return tools.ErrorJSON.serviceAccepted("followed", tools.Friends.getFollowedList(followed).toString());
			}

			else {
				if(!tools.User.existUser(id))
					return tools.ErrorJSON.serviceRefused("user n'existe pas", "55");
				List<String> lami = tools.Friends.getFriendList(id);
				if (lami.isEmpty())
					return tools.ErrorJSON.serviceRefused(id+" n'a pas d'amis", "456");
	
				return tools.ErrorJSON.serviceAccepted("friends"+id, lami.toString());
			}
				
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		} 
	}
	/**
	 * Ajoute un ami a user
	 * @param id
	 * @param usr
	 * @return le JSON de la requete
	 */
	public static JSONObject addFriend(String id, String usr) {
		try {
			tools.Friends.verifAll(id, usr);
			if(!(tools.Friends.addFriend(id, usr)==1))
				return tools.ErrorJSON.serviceRefused("Aucune operation effectue", "11");
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				return tools.ErrorJSON.serviceAccepted("friends",usr);
			}else {
				tools.Authentification.logout(id);
				return tools.ErrorJSON.serviceRefused("time out", "458");}
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		}
		
	}
	
	/**
	 * Supprime de la liste d'ami usr
	 * @param id
	 * @param usr
	 * @return le JSON de la requete
	 */
	public static JSONObject removeFriend(String id, String usr) {
		try {
			tools.Friends.verifAll(id, usr);
			if(!tools.Friends.verifList(id, usr))
				return tools.ErrorJSON.serviceRefused(usr+" n'est pas dans la liste ami", "32");
			if(!(tools.Friends.rmFriend(id, usr)==1))
				return tools.ErrorJSON.serviceRefused("Aucune operation effectue", "11");
			if (tools.Authentification.verifLimit(id)) {
				tools.Authentification.envoieAction(id);
				return tools.ErrorJSON.serviceAccepted("ami supprime", usr);
			}else {
				tools.Authentification.logout(id);
				return tools.ErrorJSON.serviceRefused("time out", "458");
			}
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "459");
		}
	}
}
