package tests;

import org.json.JSONObject;

public class FriendsTest {
	
	public static void addFriend(String id, String ami) {
		 JSONObject j = services.Friends.addFriend(id, ami);
			System.out.println("[Ajout] "+j);
	}
	
	public static void removeFriend(String id, String ami) {
		 JSONObject j = services.Friends.removeFriend(id, ami);
			System.out.println("[Suppression] "+j);
	}
	
	public static void listFriend(String user) {
		JSONObject j = services.Friends.getFriendList(user);
		System.out.println("[List ami] "+user+j);
	}
	
	
	 public static void main(String [] args) {
		 
		tests.UserTest.logUser("mukuchichan", "nagato");
		addFriend("mukuchichan", "anijya");
		listFriend("mukuchichan");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		removeFriend("mukuchichan", "anijya");
		tests.UserTest.outUser("mukuchichan");
		
	 }
	 
}