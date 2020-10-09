package services;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

public class User {
	
	/*
	 * Retrouve l'utilisateur avec comme id : `usr`
	 */
	public static JSONObject getUser(String usr) {
		try {
			tools.User.existUser(usr);
			return 	tools.User.getUser(usr);
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (JSONException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "44");
		}
	}

	/*
	 * Retrouve les utilisateurs des id presents dans `usr`
	 */
	public static JSONObject getListUser(String usr) {
		JSONObject j = new JSONObject();
		String ik="", ikp="";
		List<String> usrs= Arrays.asList(usr.split("/")) ;
		
		if(usrs.size()==1) 
			return getUser(usrs.get(0));
		try {
			tools.User.existUserList(usrs);
			return tools.User.getUserList(usrs);
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (JSONException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "31");
		}
	}

	/*
	 * creer un nouvel utilisateur avec son id:`pseudo`, `pass`, `nom`, `prenom`, `email`, `DateN`
	 */
	public static JSONObject createUser(String pseudo, String pass, String nom, String prenom, String email, String dateN, String imgUrl) {
		JSONObject j = new JSONObject();
		if((pseudo.isEmpty())||(pass.isEmpty())) 
			return tools.ErrorJSON.serviceRefused("champ_vide", "00");
		if (!tools.User.checkUsername(pseudo))
			return tools.ErrorJSON.serviceRefused("nom_refuse", "02");
		if(!tools.User.checkMail(email))
			return tools.ErrorJSON.serviceRefused("email non valide", "03");
		try {
			if (tools.User.existUser(pseudo)) 
				return tools.ErrorJSON.serviceRefused("nom_deja_pris", "01");
		} catch (SQLException e) {
			try {
				tools.User.insertNewUser(pseudo, pass, nom, prenom, email, dateN, imgUrl);
				j.put(tools.User.username, pseudo);
				j.put(tools.User.surname, nom);
				j.put(tools.User.name, prenom);
				j.put(tools.User.mail, email);
				j.put(tools.User.dateNaiss, dateN);
				j.put(tools.User.imgUrl, imgUrl);
				return j;
			} catch (SQLException e1) {
				return tools.ErrorJSON.serviceRefused(e1.getMessage(), "10");
			} catch (JSONException e1) {
				return tools.ErrorJSON.serviceRefused(e1.getMessage(), "11");
			}
		}
		return tools.ErrorJSON.serviceRefused("Operation non effectue", "90");
	}
	
	/*
	 * Supprime l'utilisateurs dont id : `usr`
	 */
	public static JSONObject removeUser(String usr) {
		JSONObject j=new JSONObject();
		try {
			if(!tools.User.existUser(usr)) 
				return tools.ErrorJSON.serviceRefused("user_not_found", "55");
			if(!tools.Authentification.isConnecte(usr))
				return tools.ErrorJSON.serviceRefused("non connecte", "60");
			if(!tools.Authentification.verifLimit(usr)) {
				tools.Authentification.logout(usr);
				return tools.ErrorJSON.serviceRefused("time out", "458");
			}else {
				tools.Messages.deleteMessageUser(usr);
				tools.User.removeUser(usr);
				return tools.ErrorJSON.serviceAccepted("deleted",usr);
			}
		} catch (SQLException e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), e.getErrorCode()+"");
		} catch (Exception e) {
			return tools.ErrorJSON.serviceRefused(e.getMessage(), "457");
		}
	}
	
}
