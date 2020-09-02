package servlet;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class User extends HttpServlet  {
	
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException{
		PrintWriter writer = res.getWriter();
		String user = req.getParameter("username");
		JSONObject aff_usr=services.User.getListUser(user);
		writer.println(aff_usr);
	}
	
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("username");
		String pwd = req.getParameter("password");
		String nom = req.getParameter("name");
		String prenom = req.getParameter("prenom");
		String email = req.getParameter("mail");
		String dateN = req.getParameter("dateNaissance");
		JSONObject cre_usr=services.User.createUser(id, pwd, nom, prenom, email, dateN);
		writer.println(cre_usr);
	}
	
	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException{
		PrintWriter writer = res.getWriter();
		String usr = req.getParameter("username");
		JSONObject del_usr=services.User.removeUser(usr);
		writer.println(del_usr);
	}
}
