package tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;

public class Friends {	
	//		ATTRIBUTS
	private final static String id1="id1";
	private final static String id2="id2";

	
	//		TABLES
	private final static String friends = "friends";
	
	
	/**
	 * Verifie si les users id et id2 existe
	 * @param id
	 * @param id2
	 * @return true si les deux existent, false sinon
	 * @throws SQLException
	 */
	public static boolean verifExist(String id, String id2) throws SQLException {
		return (!((!tools.User.existUser(id))&&(!tools.User.existUser(id2))));
	}
	
	
	/**
	 * Verifie si usr est dans la liste ami de id
	 * @param id
	 * @param usr
	 * @return true si usr est son ami, false sinon
	 * @throws SQLException
	 */
	public static boolean verifList(String id, String usr) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st = c.createStatement();
		String query = "SELECT "+ id2 +" FROM "+friends+" where "+id1+"='"+id+"';";
		ResultSet rs = st.executeQuery(query);
		while(rs.next()) {
			if(rs.getString("id2").equals(usr))
				st.close();
				c.close();
				return true;
		}
		st.close();
		c.close();
		return false;
	}
	
	/**
	 * Verifie si user et l'ami existe et si user est connecte
	 * @param id
	 * @param usr
	 * @throws SQLException
	 */
	public static void verifAll(String id, String usr) throws Exception {
		if(!tools.Authentification.isConnecte(id))
			throw new Exception("Non connecte");
		if(!tools.Friends.verifExist(id, usr))
			throw new Exception("User non existant");
	}
	
	/**
	 * @param usr
	 * @return Une liste d'ami de user
	 * @throws SQLException
	 */
	public static List<String> getFriendList(String usr) throws SQLException {
		List<String> lami=new ArrayList<>();
		Connection c = bd.Database.getMySQLConnection();
		Statement st = c.createStatement();
		String query = "SELECT "+ id2 +" FROM "+friends+" where "+id1+"='"+usr+"';";
		ResultSet rs = st.executeQuery(query);
		while(rs.next()) {
			lami.add(rs.getString("id2"));
		}
		st.close();
		c.close();
		return lami;
	}
	
	/**
	 * Supprime de la liste d'ami de id , user : usr
	 * @param id
	 * @param usr
	 * @return le nombre d'operation effectue par la base de donnee
	 * @throws SQLException
	 */
	public static int rmFriend(String id, String usr) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st = c.createStatement();
		String query = "DELETE FROM "+ friends +" WHERE "+id1+"='"+id+"' AND "+id2+"='"+usr+"';";
		int rs = st.executeUpdate(query);
		st.close();
		c.close();
		return rs;
	}
	
	/**
	 * Ajoute dans la liste d'ami de id, l'utilisateur
	 * @param id
	 * @param usr
	 * @return le nombre d'operation effectue par la base de donnee
	 * @throws SQLException
	 */
	public static int addFriend(String id, String usr) throws SQLException {
		Connection c = bd.Database.getMySQLConnection();
		Statement st = c.createStatement();
		String query = "INSERT INTO "+ friends +" ( "+id1+","+id2+" ) values ('"+id+"','"+usr+"');";
		int rs = st.executeUpdate(query);
		st.close();
		c.close();
		return rs;
	}
	
	
}
