package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class Messages extends HttpServlet  {
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id =req.getParameter("id");
		String rq = req.getParameter("request");
		String flt = req.getParameter("filtre");
		String mur = req.getParameter("mur");
		
		JSONObject j =services.Messages.choixGetMessage(id, rq, flt, mur);
		writer.println(j);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("id");
		String idmsg = req.getParameter("idmsg");
		String input = req.getParameter("Message");
		
		JSONObject j = services.Messages.sendMessage(id, idmsg, input);
		writer.println(j);
	}
	
	public void doPut(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("id");
		String idmsg = req.getParameter("idmsg");
		JSONObject j = services.Messages.setLike(id, idmsg);
		
		writer.println(j);
	}
	
	public void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PrintWriter writer = res.getWriter();
		String id = req.getParameter("id");
		String input = req.getParameter("idMessage");
		
		JSONObject j = services.Messages.removeMessage(id, input);
		writer.println(j);
	}
}
