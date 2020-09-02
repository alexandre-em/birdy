package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class Authentification extends HttpServlet {
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("login");
		String pwd = req.getParameter("password");
		JSONObject cre_usr=services.Authentification.login(id, pwd);
		writer.println(cre_usr);
	}
	
	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("login");
		JSONObject disc_usr = services.Authentification.logout(id);
		writer.println(disc_usr);
	}

	
}
