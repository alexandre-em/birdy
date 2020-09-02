package tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

public class Authentification {
	//		ATTRIBUTS
	private final static String username = "id";
	private final static String cle = "cle";
	private final static String date= "date";
	private final static String limit= "lim";
	
	//		TABLES
	private final static String is_connect = "estconnecte"; 
	
	/**
	 * Verifie si `id` est connecte
	 * @param id
	 * @throws SQLException
	 */
	public static boolean isConnecte(String id) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "Select "+ username+ " from "+ is_connect +" where "+username+" = '"+id+"';"; 
		ResultSet rs= st.executeQuery(rq);
		while(rs.next()) {
			if(rs.getString(username).equals(id)) {
				st.close();
				c.close();
				return true;}
		}
		st.close();
		c.close();
		return false;
	}
	
	/**
	 * Ajoute dans la table `estconnecte` l'utilisateur `id`
	 * @param id
	 * @param key
	 * @return le nombre d'operations effectues
	 * @throws SQLException
	 */
	public static int login(String id) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st= c.createStatement();
		String rq = "INSERT INTO "+ is_connect + " ("+username+","+cle+") values ('"+id+"',MD5(RAND()));" ; 
		int rs= st.executeUpdate(rq);
		st.close();
		c.close();
		return rs;
	}
	
	/**
	 * Supprime de la table `estconnecte` l'utilisateur `id`
	 * @param id
	 * @return le nombre d'operations effectues
	 * @throws SQLException
	 */
	public static int logout(String id) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st = c.createStatement();
		String rq = "DELETE FROM "+ is_connect + " WHERE "+username+" = '"+id+"';";
		int rs = st.executeUpdate(rq);
		st.close();
		c.close();
		return rs;
	}
	
	public static int envoieAction(String id) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st = c.createStatement();
		String rq = "UPDATE "+is_connect+" SET "+limit+" = CURRENT_TIMESTAMP;";
		int rs= st.executeUpdate(rq);
		st.close();
		c.close();
		return rs;
	}
	/* Renvoie vrai si la limite n'a pas ete encore atteinte faux sinon */
	@SuppressWarnings("deprecation")
	public static boolean verifLimit(String id) throws Exception {
		Connection c = bd.Database.getMySQLConnection();
		Statement st = c.createStatement();
		String query = "SELECT "+ limit +" FROM "+is_connect+" where "+username+"='"+id+"';";
		ResultSet rs = st.executeQuery(query);
		Timestamp t;
		while(rs.next()) {
			t = rs.getTimestamp(limit);
			t.setMinutes(t.getMinutes()+10);
			st.close();
			c.close();
			return t.after(new Timestamp(System.currentTimeMillis()));
		}
		throw new Exception ("[ERROR] aucune date recupere");
	}
	
}
