#Web server stuff
import tornado.ioloop
import tornado.web
import tornado.httpserver
import json

#Utility libraries
import os.path
import functionFactory
import bookFinder

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('main.html')

class citeWebsiteHandler(tornado.web.RequestHandler):

	def get(self):
		self.render('website.html')

	def post(self):
		url2  = self.get_argument("url", "")
		#print("Posting URL!")
		#print(url2)
		payload = functionFactory.functionFinder(url2)
		#print(payload)
		self.write(json.dumps(payload))




#class aboutHandler(tornado.web.RequestHandler):
#	def get(self):
#		self.render('about.html')

class myBibHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('bibliography.html')

class donateHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('donate.html')

class contributeHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('feedback.html')

class citeBookHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('book.html')

	def post(self):	
		isbn2 = self.get_argument("isbnSearch", "")
		payload2 = bookFinder.datahunt(isbn2)
		#print(payload2)
		self.write(json.dumps(payload2))


#This tells tornado where to find static files
settings = dict(
	template_path = os.path.join(os.path.dirname(__file__), "templates"),
	static_path = os.path.join(os.path.dirname(__file__), "static"),
	debug = True
)

handlers = [(r'/', MainHandler),
			#(r'/about', aboutHandler),
			(r'/donate', donateHandler),
			(r'/feedback', contributeHandler),
			(r'/books', citeBookHandler),
			(r'/website', citeWebsiteHandler),
			(r'/bibliography', myBibHandler)]

def app():
	print('Server Running...')
	print('Press ctrl + c to close')
	application = tornado.web.Application(handlers, **settings)
	http_server = tornado.httpserver.HTTPServer(application)
	port = int(os.environ.get("PORT", 5000))
	http_server.listen(port)
	# application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()

#Start the server at port n
if __name__ == "__main__":
	app()