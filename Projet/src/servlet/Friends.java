package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class Friends extends HttpServlet  {
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("id");
		String followed = req.getParameter("followed");
		JSONObject j = services.Friends.getFriendList(id, followed);
		writer.println(j);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("id");
		String fr = req.getParameter("ami");
		JSONObject j = services.Friends.addFriend(id, fr);
		writer.println(j);
	}
	
	public void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("id");
		String fr = req.getParameter("ami");
		JSONObject j = services.Friends.removeFriend(id, fr);
		writer.println(j);
	}
}
