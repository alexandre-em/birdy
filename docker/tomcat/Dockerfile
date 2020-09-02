FROM tomcat:9.0
LABEL maintainer="laure.soulier@lip6.fr"

#Configuration
RUN ln -s /usr/local/tomcat/webapps.dist/manager webapps/manager
RUN ln -s /usr/local/tomcat/webapps.dist/host-manager webapps/host-manager
RUN ln -s /usr/local/tomcat/webapps.dist/ROOT webapps/ROOT
COPY context.xml /usr/local/tomcat/webapps.dist/manager/META-INF/context.xml
COPY tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml

#Deploy sample applications
COPY sample.war $CATALINA_HOME/webapps/sample.war
COPY testBirdy_war_exploded.war $CATALINA_HOME/webapps/testBirdy_war_exploded.war
COPY Projet.war $CATALINA_HOME/webapps/Projet.war


EXPOSE 8080
CMD ["catalina.sh", "run"]

#docker build -t laure/tomcat-sample .
# docker run -it --name mysampleapp -p 8080:8080 laure/tomcat-sample