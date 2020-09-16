package tools;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.QueryBuilder;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

import bd.Database;

public class Messages {
	//		ATTRIBUTS
	public final static String username = "id_author";
	public final static String msgid = "_id";
	public final static String name = "name";
	public final static String msgtext = "text";
	public final static String datePub= "date";
	public final static String like= "like";
	public final static String comment= "comment";
	
	//		TABLES
	public final static String messaget = "message"; 
	
	/**
	 * @param id
	 * @return Renvoie la liste des Message de l'user `id`
	 */
	public static List<String> getMsgList(String id) {
		List<String> result = new ArrayList<>();
		Document doc = new Document();
		
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		doc.append(username, id);
		FindIterable<Document> find = coll.find(doc);
		MongoCursor<Document> cursor = find.iterator();
		while(cursor.hasNext()) {
			result.add((cursor.next()).toJson());
		}
		cursor.close();
		return result;
	}
	
	public static List<String> getMur (List<String> lami){
		List<String> result = new ArrayList<>();
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		BasicDBObject inQuery = new BasicDBObject();
		inQuery.put(username, new BasicDBObject("$in", lami));
		FindIterable<Document> find = coll.find(inQuery);
		MongoCursor<Document> cursor = find.iterator();
	    while(cursor.hasNext()) {
	    	result.add((cursor.next()).toJson());
	    }
		cursor.close();
		return result;
	}
	
	/**
	 * Verifie si `id` de user correspond bien a celui qui a poste le message `msg` 
	 * @param msg
	 * @param id
	 * @return `true` si les `id` correspondent, `false` sinon
	 * @throws JSONException
	 */
	public static boolean checkIdMsg(String msg, String id) throws JSONException {
		List<String> result = new ArrayList<>();
		JSONObject teste, msgi;
		Document doc = new Document();
		
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		doc.append(username, id);
		FindIterable<Document> find = coll.find(doc);
		MongoCursor<Document> cursor = find.iterator();
		while(cursor.hasNext()) {
			result.add((cursor.next()).toJson());
		}
		cursor.close();
		for (String s : result) {
			teste = new JSONObject(s);
			msgi = teste.getJSONObject(msgid);
			if( msg.equals(msgi.get("$oid")) ) 
				return true;
		}
		throw new JSONException("Message non trouve");
	}
	
	/**
	 * Creer un message
	 * @param id
	 * @param input
	 * @return le JSON du message cree
	 * @throws SQLException
	 */
	public static String createMessage(String id, String input) throws SQLException {
		GregorianCalendar  calendar =new java.util.GregorianCalendar () ;
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		String nom = tools.User.getNom(id);
		Document doc = new Document();
		doc.append(username, id);
		doc.append(name, nom);
		doc.append(msgtext, input);
		Date date_du_jour = calendar.getTime();
		doc.append(datePub, date_du_jour);
		doc.append(like, new ArrayList<String>());
		doc.append(comment, new ArrayList<String>());
		coll.insertOne(doc);
		return doc.toJson();
	}
	
	public static String replyMessage(String id, String idmsg, String content) throws JSONException, SQLException {
		String s = rechercheMessageId(idmsg);
		JSONObject j = new JSONObject(s);
		JSONArray lj = j.getJSONArray(comment);
		List<String> l = new ArrayList<>();
		for (int i=0 ; i<lj.length(); i++) {
			l.add((String) lj.get(i));
		}
		l.add(createMessage(id, content));
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		Document dm = new Document().append(msgid, new ObjectId(idmsg));
		Document rep = coll.find(dm).first();
		rep.append(comment, l);
		coll.replaceOne(coll.find(dm).first(), rep);
		return rep.toJson();
	}
	
	public static String deleteReply (String id, String idRep) throws JSONException {
		String s = rechercheMessageId(id);
		JSONObject j = new JSONObject(s);
		JSONArray lj = j.getJSONArray(comment);
		List<String> l = new ArrayList<>();
		for (int i=0 ; i<lj.length(); i++) {
			if (!lj.getString(i).contains(idRep))
				l.add((String) lj.get(i));
		}
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		Document dm = new Document().append(msgid, new ObjectId(id));
		Document rep = coll.find(dm).first();
		rep.append(comment, l);
		coll.replaceOne(coll.find(dm).first(), rep);
		return rep.toJson();
	}
	
	public static JSONObject like(String id) throws JSONException {
		GregorianCalendar  calendar =new java.util.GregorianCalendar () ;
		JSONObject like = new JSONObject();
		like.append(username, id);
		Date date_du_jour = calendar.getTime();
		like.append(datePub, date_du_jour);
		return like;
	}
	
	public static String setLike(String id, String idmsg) throws JSONException {
		boolean state=false;
		String s = rechercheMessageId(idmsg);
		JSONObject j = new JSONObject(s);
		JSONArray lj = j.getJSONArray(like);
		List<String> l = new ArrayList<>();
		for (int i=0 ; i<lj.length(); i++) {
			if(((String)lj.get(i)).contains(id))
				state=true;
			else
				l.add((String) lj.get(i));
		}
		if (!state)
			l.add(id);
		System.out.println(state+" "+l);
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		Document dm = new Document().append(msgid, new ObjectId(idmsg));
		Document rep = coll.find(dm).first();
		rep.append(like, l);
		coll.replaceOne(coll.find(dm).first(), rep);
		return rep.toJson();
	}
	
	/**
	 * Recherche un message par son `idmsg`
	 * @param idmsg
	 * @return	Le message trouve
	 * @throws JSONException
	 */
	public static String rechercheMessageId(String idmsg) throws JSONException{
		List<String> result = new ArrayList<>(); JSONObject teste, msi;
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		FindIterable<Document> find = coll.find();
		MongoCursor<Document> cursor = find.iterator();
		while(cursor.hasNext()) {
			result.add((cursor.next()).toJson());
		}
		cursor.close();
		for(String s : result) {
			teste = new JSONObject(s);
			msi = teste.getJSONObject(msgid);
			if(idmsg.equals(msi.get("$oid")))
				return s;
		}
		throw new JSONException("Message non trouve");
	}
	/**
	 * Recherche un/des message filtre par (la valeur du filtre `requete`, le nom du `filtre`)
	 * @param requete
	 * @param filtre
	 * @return La liste de Message
	 */
	public static List<String> rechercheMessage(String requete, String filtre) {
		List<String> result = new ArrayList<>();
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		Document doc = new Document();
		doc.append(filtre, requete);
		FindIterable<Document> find = coll.find(doc);
		MongoCursor<Document> cursor = find.iterator();
		while(cursor.hasNext()) {
			result.add((cursor.next()).toJson());
		}
		cursor.close();
		return result;
	}
	
	/**
	 * Cherche le message par l'id et le Supprime de la base de donnee
	 * @param idmsg
	 */
	public static void deleteMessage(String msg) {
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		Document doc = new Document();
		doc.append(msgid, new ObjectId(msg));
		coll.deleteOne(doc);
	}
	
	public static void deleteMessageUser(String id) {
		MongoDatabase db = Database.getMongoDBConnection();
		MongoCollection<Document> coll = db.getCollection(messaget);
		Document doc = new Document();
		doc.append(username, id);
		coll.deleteMany(doc);
	}
	
}
