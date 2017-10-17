import isbnlib as isbnlib
from isbnlib.registry import bibformatters

def datahunt(isbnSearch):

	searchTerm = isbnSearch

	isbn = isbnlib.isbn_from_words(searchTerm)
	returnData = isbnlib.meta(isbn)
	
	cover = isbnlib.cover(isbn)
	#print("Cover: ", cover)

	
	try:
		mainTitle = returnData["Title"]
	except Exception as e:
		mainTitle = ""

	
	try:
		mainAuthors = returnData["Authors"]
	except Exception as e:
		mainAuthors = ""


	try:
		mainPublisher = returnData["Publisher"]
	except Exception as e:
		mainPublisher = ""


	try:
		mainYear = returnData["Year"]
	except Exception as e:
		mainYear = ""


	try:
		mainISBN = returnData["ISBN-13"]
	except Exception as e:
		mainISBN = ""	

	try:
		mainCover = cover["smallThumbnail"]
	except Exception as e:
		mainCover = ""

	bookInfo = {
		"title" : mainTitle,
		"author" : mainAuthors,
		"publisher" : mainPublisher,
		"year" : mainYear,
		"isbn" : mainISBN,
		"coverURL" : mainCover
	}
	return bookInfo