package services;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

public class Authentification {
	
	/*
	 * Permet de se logger dans le site
	 */
	public static JSONObject login(String id, String pwd) {
			if((id.isEmpty())||(pwd.isEmpty())) 
				return tools.ErrorJSON.serviceRefused("champs_vide", "00");
			try {
				if(tools.Authentification.isConnecte(id))
					return tools.ErrorJSON.serviceRefused("User Deja connecte", "01");
				if(!tools.User.idPwd(id, pwd)) 
					return tools.ErrorJSON.serviceRefused("informations_erronees", "10");
				if(!(tools.Authentification.login(id)==1))
					return tools.ErrorJSON.serviceRefused("Aucune operation effectue", "11");
				return tools.ErrorJSON.serviceAccepted("id", id).put("key", tools.User.getKey(id));
			} catch (SQLException e) {
				return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
			} catch (JSONException e) {
				return tools.ErrorJSON.serviceRefused(e.getMessage(), "3");
			}
	}
	
	/*
	 * Permet de se deconnecter du site
	 */
	public static JSONObject logout (String id) {
		try {
			if((!tools.User.existUser(id))&&(!tools.Authentification.isConnecte(id)))
				return tools.ErrorJSON.serviceRefused(id+" n'est pas connecte", "19");
			String key=tools.User.getKey(id);
			if (!(tools.Authentification.logout(id)==1))
				return tools.ErrorJSON.serviceRefused("Aucune operation effectue", "11");
			return tools.ErrorJSON.serviceAccepted( key,id);
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		}
	}
}
