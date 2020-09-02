package tests;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MessagesTest {
	public static void main(String[] args) {
	services.Authentification.login("anijya", "anikofu");
	//JSONObject j = services.Messages.getMessage("5e5571bfbcde4139f9edc248");
	//System.out.println(j);
	JSONObject j= services.Messages.createMessage("anijya", "blabla");
	//JSONObject re = services.Messages.removeMessage("anijya", "5e57f54a71630a1fccc96fb1");
	try {
		System.out.println(j);
		JSONObject j2=new JSONObject(tools.Messages.rechercheMessage("anijya", tools.Messages.username).get(0));
		System.out.println(j2);
		j2 = (JSONObject) j2.get(tools.Messages.msgid);
		System.out.println(
		services.Messages.replyMessage("anijya", j2.get("$oid").toString(), "ok"));
		System.out.println(
		services.Messages.replyMessage("anijya", j2.get("$oid").toString(), "ko"));
		j=services.Messages.getMessage(j2.get("$oid").toString());
		System.out.println(j2.get("$oid").toString());
		System.out.println(j);
	} catch (JSONException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	}
}
