package tests;


import java.sql.SQLException;

import org.json.JSONObject;

public class UserTest {
	
	public static void createUser( String username, String pass, String nom, String prenom, String email, String dateN) {
		 JSONObject j = services.User.createUser(username, pass, nom, prenom, email, dateN, "");
			System.out.println("[Creation]: "+j);
	}
	
	public static void showUsers(String user) {
		JSONObject j = services.User.getListUser(user);
		System.out.println(j);
	}
	
	public static void removeUser(String user) {
		JSONObject j = services.User.removeUser(user);
		System.out.println("[Delete] "+user+j);
	}
	
	public static JSONObject logUser(String id, String pwd) {
		JSONObject j = services.Authentification.login(id, pwd);
		System.out.println("[Connexion]: "+j);
		return j;
	}
	
	public static JSONObject outUser(String id) {
		JSONObject j = services.Authentification.logout(id);
		System.out.println("[Deconnexion]: "+j);
		return j;
	}
	
	 public static void main(String [] args) {
		 
		createUser("test", "test1", "test12", "test21", "test1@gmail.com", "1998/10/3");
		System.out.println(services.User.getListUser("otojya/anijya"));
		showUsers("test");
		logUser("test", "test1");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			System.err.println("error");
		}
		outUser("test");
		
		removeUser("test");
	 }
	 
}
