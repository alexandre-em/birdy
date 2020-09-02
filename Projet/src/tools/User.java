package tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.json.JSONException;
import org.json.JSONObject;

public class User {
	//		ATTRIBUTS
	public final static String username = "username";
	public final static String password = "password";
	public final static String surname = "nom";
	public final static String name = "prenom";
	public final static String mail = "email";
	public final static String dateNaiss= "dateN";
	
	//		TABLES
	private final static String utilisateurs = "utilisateurs";
	private final static String is_connect = "estconnecte"; 
	
	
	//		LISTE
	private static String[] censure = {"HITLER"};

	/**
	 * Verifie si `id` existe dans la base de donnee
	 * @param id
	 * @return true si `id` existe, `false` sinon
	 * @throws SQLException
	 */
	public static boolean existUser(String id) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "Select "+ username +" from "+ utilisateurs +" where "+ username +" = '"+id+"';"; 
		ResultSet rs= st.executeQuery(rq);
		while (rs.next()) { 
			if(rs.getString("username").equals(id))
				return true;
		}
		st.close();
		c.close();
		throw new SQLException ("User non trouve");
	}
	
	public static boolean existUserList(List<String> usrs) throws SQLException {
		for(int i=0; i<usrs.size(); i++) {
			if(!tools.User.existUser(usrs.get(i)))
				return false;
		}
		return true;
	}
	
	public static JSONObject getUserList(List<String> luser) throws JSONException, SQLException {
		JSONObject list=new JSONObject();
		for (String s: luser) {
			list.put(s, getUser(s));
		}
		return list;
	}
	
	public static JSONObject getUser(String id) throws SQLException, JSONException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "Select "+ username+" , "+ surname +" , "+ name +" , "+ mail +" , "+ dateNaiss+" from "+ utilisateurs +" where "+ username +" = '"+id+"';"; 
		ResultSet rs= st.executeQuery(rq);
		JSONObject jusr=new JSONObject();
		while (rs.next()) { 
			if(rs.getString(username).equals(id)) {
				jusr.put(username, rs.getString(username));
				jusr.put(name, rs.getString(name));
				jusr.put(surname, rs.getString(surname));
				jusr.put(mail, rs.getString(mail));
				jusr.put(dateNaiss, rs.getString(dateNaiss));
			}
		}
		st.close();
		c.close();
		return jusr;
	}
	
	/**
	 * Verifie si le couple (`id`, `pwd`) est correct
	 * @param id
	 * @param pwd
	 * @return `true` si les infos correspondent, `false` sinon
	 * @throws SQLException
	 */
	public static boolean idPwd(String id, String pwd) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "Select AES_DECRYPT(password, '" + bd.DBStatic.code + "') from utilisateurs where username='"+id+"';"; 
		ResultSet rs= st.executeQuery(rq);
		while (rs.next()) {
			if(rs.getString("AES_DECRYPT(password, '"+bd.DBStatic.code+"')").equals(pwd)) 
				return true;
		}
		st.close();
		c.close();
		return false;
	}
	
	/**
	 * Insert un nouvel utilisateurs dans la base de donnee
	 * @param pseudo
	 * @param pass
	 * @param nom
	 * @param prenom
	 * @param email
	 * @param dateN
	 * @throws SQLException
	 * @throws JSONException
	 */
	public static void insertNewUser(String pseudo, String pass, String nom, String prenom,String email,String dateN) throws SQLException, JSONException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "INSERT INTO utilisateurs ("+username+","+ password+","+ surname +","+ name+","+ mail +","+ dateNaiss;
		rq=rq+") values ('" + pseudo + "', AES_ENCRYPT('"+pass+"', '"+bd.DBStatic.code+"'), '"+ nom +"' ,'"+prenom+"','"+ email +"','"+dateN+"');";
		int rs= st.executeUpdate(rq);
		if(rs==0)
			throw new JSONException("ERROR : Aucune insertion");
		st.close();
		c.close();
	}
	
	/**
	 * Genere une cle de lettres et chiffres aleatoire de taille 32
	 * @return
	 */
	public static String generateKey() {
		Random r = new Random();
		String s="";
		for(int ir=r.nextInt(9), i=ir;i<(ir+32);i++) {
			if(i%2==0) 
				s=s+""+r.nextInt(9);
			else
				s=s+((char)(r.nextInt(26)+'a'));
		}
		return s;
	}

	/**
	 * Renvoie la cle de `id` de la table `estconnecte`
	 * @param id
	 * @return la cle
	 * @throws SQLException
	 */
	public static String getKey(String id) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "Select cle FROM estconnecte WHERE id = '"+id+"';"; 
		ResultSet rs= st.executeQuery(rq);
		while(rs.next()) {
			String s = rs.getString("cle");
			if(!s.isEmpty())
				return s;
		}
		st.close();
		c.close();
		return null;
	}

	/**
	 * Verifie si le mail contient bien les elements necessaires
	 * @param mail
	 */
	public static boolean checkMail(String mail) {
		return (mail.contains("@") && mail.contains("."));
	}

	/**
	 * Verifie si `username` n'est pas censure
	 * @param username
	 */
	public static boolean checkUsername(String username) {
		for (String s : censure) {
			if(s.contains(username.toUpperCase()))
				return false;
		}
		return true;
	}
	
	/**
	 * Renvoie le nom de `id`
	 * @param id
	 * @throws SQLException
	 */
	public static String getNom(String id) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "Select prenom FROM utilisateurs WHERE username = '"+id+"';"; 
		ResultSet rs= st.executeQuery(rq);
		while(rs.next()) {
			String s = rs.getString("prenom");
			if(s.equals(id))
				return s;
		}
		st.close();
		c.close();
		return null;		//On ne doit pas arriver dans ce cas
	}
	
	/**
	 * Supprime de la base de donnee `usr`
	 * @param usr
	 * @throws SQLException
	 */
	public static void removeUser(String usr) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "DELETE FROM utilisateurs WHERE username = '"+usr+"';"; 
		int rs= st.executeUpdate(rq);
		if(rs==0)
			throw new SQLException("Aucune operations effectues");
		st.close();
		c.close();
	}
	
}
