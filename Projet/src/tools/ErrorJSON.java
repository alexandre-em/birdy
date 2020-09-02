package tools;

import org.json.JSONException;
import org.json.JSONObject;

public class ErrorJSON {

	/*
	 * Genere un JSON si le service ne s'est pas bien deroule
	 */
	public static JSONObject serviceRefused(String message, String code) {
		try {
			return new JSONObject().put("mess",message).put("code",code);
		} catch (JSONException e) {
			
		}
		return null;
	}

	/*
	 * Genere un JSON si le service s'est bien deroule
	 */
	public static JSONObject servAccepted() {
		try {
			return new JSONObject().put("key", "OK");
		} catch (JSONException e) {
			
		}
		return null;
	}
	/*
	 * Genere un JSON si le service s'est bien deroule
	 */
	public static JSONObject serviceAccepted(String key, String value) {
		try {
			return new JSONObject().put("key", key).put("id", value);
		} catch (JSONException e) {
			
		}
		return null;
	}
}
