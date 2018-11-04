from tld import get_tld
import os.path
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

def functionFinder(url):
	def remove_char(string):
		string = list(string)
		string.remove('.')
		return ''.join(string)

	def get_domain_name(url):
		domain_name = get_tld(url)
		return domain_name

	#print("THIS IS THE URL IM USING", url)
	my_tld = get_domain_name(url)
	passTld = my_tld

	print('Domain: ', get_domain_name(url))
	domain = remove_char(my_tld)
	#print('Removed period: ', domain)

	parser = getParser(domain)
	return parser(getHTML(url), passTld)

def getHTML(url):

	#print('Passed URL = ', url)
	print('Scanning for info...')

	# opening connection, grabbing page
	uClient = uReq(url)

	# offloads data into var
	page_html = uClient.read()

	# closes connection
	uClient.close()

	# HTML parsing
	page_soup = soup(page_html, "html.parser")

	return page_soup

def getParser(domain):
	if domain == "foxnewscom" or domain == "foxbusinesscom":
		return foxnewscom

	if domain == "cnncom":
		return cnncom

	if domain == "nytimescom":
		return nytimescom

	if domain == "timecom":
		return timecom

	if domain == "wikipediaorg":
		return wikipediaorg

	if domain == "gocom" or domain == "abcnewscom":
		return abcnewscom

	if domain == "bbccom":
		return bbccom

	if domain == "cbsnewscom":
		return cbsnewscom

	if domain == "aporg":
		return aporg

	if domain == "apnewscom":
		return apnewscom

	if domain == "forbescom":
		return forbescom

	if domain == "bloombergcom":
		return bloombergcom 

	if domain == "nbcnewscom":
		return nbcnewscom

	if domain == "reuterscom":
		return reuterscom

	if domain == "theguardiancom":
		return theguardiancom

	if domain == "cfrorg":
		return cfrorg

	if domain == "techcrunchcom":
		return techcrunchcom

	if domain == "pornhubcom":
		return pornhubcom

	else:
		return default_	

def formData(title, author, publisher, websiteTitle, year, month, day):
	data = {
		"title" : title,
		"author" : author,
		"publisher" : publisher,
		"websiteTitle" : websiteTitle,
		"year" : year,
		"month" : month,
		"day" : day,
	}
	print(data)
	return data
	
def foxnewscom(page_soup, passTld):

	try:
		title_container = page_soup.find("meta",{"name":"dc.title"})
		title = title_container['content']
	except Exception as e:
		print('Failed to find title')
		title = ""

	try:
		authorContainer = page_soup.find('meta', attrs={'name':"dc.creator"})
		author = authorContainer['content']
	except Exception as e:
		print('Failed to find author')
		author = ""

	publisher = "Fox News Network LLC"

	websiteTitle = "Fox News"

	try:
		#gets date formatted in ISO
		pubDateContainer = page_soup.find('meta', attrs={'name':"dc.date"})
		pubDate = pubDateContainer['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
	except Exception as e:
		print('Failed to find pubdate')
		year = ""
		month = ""
		day = ""

	return formData(title, author, publisher, websiteTitle, year, month, day)



def cnncom(page_soup, passTld):
	try:
		titleContainer = page_soup.find('meta', attrs={'property':"og:title"})
		title = titleContainer['content']
	except Exception as e:
		print("failed to find title")
		title = ''

	def authorHunt():
		author_container = page_soup.find("span",{"class":"metadata__byline__author"})
		if author_container == None:
			author_container = page_soup.find("span",{"class":"byline"})
			if author_container.a != None:
				author = author_container.a.text
				return(author)

			else:
				nasty = author_container.text
				if nasty.endswith(', CNN'):
					nasty = nasty[:-5]

				if nasty.lower().startswith('by '):
					nasty = nasty[3:]

				author = nasty
				return(author)

		elif author_container.a == None:
			print('Author isn\'t written normally. Looking elsewhere...')
			nasty = author_container.text
			
			if nasty.endswith(', CNN'):
				nasty = nasty[:-5]

			if nasty.lower().startswith('by '):
				nasty = nasty[3:]

			author = nasty
			return(author)

		else:
			author = author_container.a.text
			return(author)

	author = authorHunt()

	publisher = "Cable News Network"

	websiteTitle = "CNN"


	#gets date formatted in ISO
	def dateHunt():
		pubDate_container = page_soup.find('meta', attrs={'property':"og:pubdate"})

		if pubDate_container == None:
			pubDate_container = page_soup.find('meta', attrs={'name':"date"})
			pubDate = pubDate_container['content']
			return(pubDate)

		else:
			pubDate = pubDate_container['content']
			return(pubDate)
	try:
		dateHunt()

		pubDate = dateHunt()
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	except Exception as e:
		year = ''
		month = ''
		day = ''
		print('no pubdate')

	return formData(title, author, publisher, websiteTitle, year, month, day)

def nytimescom(page_soup, passTld):
	try:
		titleContainer = page_soup.find('meta', attrs={'property':"og:title"})
		title = titleContainer['content']

	except Exception as e:
		print('Couldnt find title')
		title = ''

	def authorHunt():
		if page_soup.find("span",{"class":"byline__author"}) != None:
			author_container = page_soup.find("span",{"class":"byline__author"})

			if author_container.text != None:
				nasty = author_container.text

				if nasty.lower().startswith('by'):
					nasty = nasty[3:]
					author = nasty
					return(author)

				else:
					author = author_container.text
			return(author)

		elif page_soup.find("div",{"id":"byline"}) != None:
			author_container = page_soup.find("div",{"id":"byline"})

			if author_container.text != None:
				nasty = author_container.text

				if nasty.lower().startswith('by'):
					nasty = nasty[3:]
					author = nasty
					return(author)

				else:
					author = author_container.text
			return(author)

		elif page_soup.find("span",{"class":"byline-author"}) != None:
			author_container = page_soup.find("span",{"class":"byline-author"})
			author = author_container['data-byline-name']
			return(author)

		else:
			author = ''
			return(author)
		
	try:
		author = authorHunt()
	except Exception as e:
		print('author failed')
		author = ''

	publisher = "The New York Times Company"

	websiteTitle = "The New York Times"

	#gets date formatted in ISO
	def dateHunt():
		pubDate_container = page_soup.find('meta', attrs={'name':"pdate"})

		if pubDate_container == None:
			pubDate_container = page_soup.find('meta', attrs={'name':"ptime"})
			pubDate = pubDate_container['content']
			return(pubDate)

		else:
			pubDate = pubDate_container['content']
			return(pubDate)

	try:
		dateHunt()
		pubDate = dateHunt()
		year = pubDate[0:4]
		month = pubDate[4:6]
		day = pubDate[6:9]
	except Exception as e:
		print('pubdate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

#this script is week bc of Time's shitty class names. Leaving it for now
def timecom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	publisher = "Time Inc."
	websiteTitle = "TIME"

	try:
		author_container = page_soup.find('meta', attrs={'property':"author"})
		author = author_container['content']
	except Exception as e:
		print('author fail')
		author = ''

	#gets date formatted in ISO

	if page_soup.find('div', attrs={'data-reactid':"210"}) != None:
		pubDate_container = page_soup.find('div', attrs={'data-reactid':"210"})
		pubDateTemp = pubDate_container.text
		pubDate = pubDateTemp.translate(None, ',')
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	else:
		print('pubdate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def wikipediaorg(page_soup, passTld):
	if page_soup.find('h1', attrs={'id':"firstHeading"}) != None:
		title_container = page_soup.find('h1', attrs={'id':"firstHeading"})
		title = title_container.text
	else:
		title = ""

	author = ""
	publisher = "Wikimedia Foundation, Inc."
	websiteTitle = "Wikipedia, the free encyclopedia"
	year = ""
	month = ""
	day = ""

	return formData(title, author, publisher, websiteTitle, year, month, day)

def abcnewscom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	publisher = "ABC News Internet Ventures"
	websiteTitle = "ABC News"

	try:
		authorContainer = page_soup.find('div', attrs={'rel':"author"})
		print('Author container: ', authorContainer)
		author = authorContainer.text[3:]
		if author.lower().endswith(', associated press'):
			author = author[:-18]
		if author.lower().endswith(', ap national writer'):
			author = author[:-20]
		print('Author: ', author)
	except Exception as e:
		print('author fail')
		author = ''

	if page_soup.find('meta', attrs={'name':"DC.date.issued"}) != None:
		pubDate_container = page_soup.find('meta', attrs={'name':"DC.date.issued"})
		pubDate = pubDate_container['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	elif page_soup.find('meta', attrs={'name':'Date'}) != None:
		pubDate_container = page_soup.find('meta', attrs={'name':'Date'})
		pubDate = pubDate_container['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	else:
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def bbccom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "BBC News"
	publisher = "BBC"

	try:
		pubDate_container = page_soup.find('div', attrs={'class':"date date--v2"}).text
		pubDate = pubDate_container.split(' ')
	
		year = pubDate[2]
		month = pubDate[1]
		day = pubDate[0]

	except Exception as e:
		year = ""
		month = ""
		day = ""


	author = ""

	return formData(title, author, publisher, websiteTitle, year, month, day)

def cbsnewscom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "CBS News"
	publisher = "CBS Interactive Inc."

	if page_soup.find('time', attrs={'class':"time"}) != None:
		pubDate_container = page_soup.find('time', attrs={'class':"time"})
		pubDate = pubDate_container['datetime']

		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
		
	elif page_soup.find('span', attrs={'class':"time"}) != None:
		pubDate_container = page_soup.find('span', attrs={'class':"time"}).text.replace(",", "")
		pubDate = pubDate_container.split(' ')
		
		try:
			year = pubDate[2]
			month = pubDate[0]
			day = pubDate[1]
		except Exception as e:
			pass

	else:
		print('pubdate fail')
		year = ""
		month = ""
		day = ""

	author = ""

	return formData(title, author, publisher, websiteTitle, year, month, day)

def aporg(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'name':"title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "Associated Press"
	publisher = "Associated Press"

	try:
		pubDate_container = page_soup.find('time', attrs={'itemprop':"datePublished"})
		pubDate = pubDate_container['datetime']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
	except Exception as e:
		print('pubdate fail')
		year = ''
		month = ''
		day = ''

	author = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def apnewscom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "Associated Press News"
	publisher = "Associated Press"

	try:
		author_container = page_soup.find('h4').text
		author_container = author_container.split()
		author_container = author_container[1:]
		author = ' '.join(author_container)
		print(author)
	except Exception as e:
		print('author fail')
		author = ''

	day = ""
	month = ""
	year = ""

	return formData(title, author, publisher, websiteTitle, year, month, day)

def forbescom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "Forbes"
	publisher = "Forbes, Inc."

	try:
		author_container = page_soup.find('meta', attrs={'property':"article:author"})
		author = author_container['content']
	except Exception as e:
		print('author fail')
		author = ''

	try:
		pubDate_container = page_soup.find('meta', attrs={'property':"article:published"})
		pubDate = pubDate_container['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
	except Exception as e:
		print('pubDate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def bloombergcom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "Bloomberg News"
	publisher = "Bloomberg L.P."

	try:
		author_container = page_soup.find('meta', attrs={'name':"parsely-author"})
		author = author_container['content']
	except Exception as e:
		print('author fail')
		author = ''

	try:
		pubDate_container = page_soup.find('meta', attrs={'name':"parsely-pub-date"})
		pubDate = pubDate_container['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
	except Exception as e:
		print('pubDate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def nbcnewscom(page_soup, passTld):
	try:
		title_container = page_soup.find('div', attrs={'class':"article-hed"})
		title = title_container.h1.text
	except Exception as e:
		title_container = page_soup.find('meta', attrs={'name':"og:title"})
		title = title_container['content']

	websiteTitle = "NBC News"
	publisher = "NBC News International"

	try:
		author_container = page_soup.find('span', attrs={'class':"byline_author"})
		author = author_container.text.strip()
	except Exception as e:
		print('author fail')
		author = ''

	try:
		pubDate_container = page_soup.find('meta', attrs={'name':"DC.date.issued"})
		pubDate = pubDate_container['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
	except Exception as e:
		print('pubDate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def reuterscom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "Reuters"
	publisher = "Reuters"

	try:
		author_container = page_soup.find('meta', attrs={'property':"og:article:author"})
		author = author_container['content']
	except Exception as e:
		print('author fail')
		author = ''

	try:
		pubDate_container = page_soup.find('meta', attrs={'property':"og:article:published_time"})
		pubDate = pubDate_container['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
	except Exception as e:
		print('pubDate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def theguardiancom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "The Guardian"
	publisher = "Guardian News and Media Limited"

	try:
		author_container = page_soup.find('meta', attrs={'name':"author"})
		author = author_container['content']
	except Exception as e:
		print('author fail')
		author = ''

	try:
		pubDate_container = page_soup.find('meta', attrs={'property':"article:published_time"})
		pubDate = pubDate_container['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
	except Exception as e:
		print('pubDate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def cfrorg(page_soup, passTld):
	try:
		title_container = page_soup.find('h1', attrs={'class':"article-header__title"})
		title = title_container.text
	except Exception as e:
		if page_soup.find('meta', attrs={'name':"title"}) != None:
			title_container = page_soup.find('meta', attrs={'name':"title"})
			title = title_container['content']
		else:
			print('title fail')
			title = ''

	websiteTitle = "Council on Foreign Relations"
	publisher = "Council on Foreign Relations"

	try:
		author_container = page_soup.find('p', attrs={'class':"article-header__byline"}).a
		author = author_container.text
	except Exception as e:
		print('author fail')
		author = ''

	try:
		pubDate_container = page_soup.find('p', attrs={'class':"article-header__date-ttr"}).text.replace(",", "").strip()
		pubDate = pubDate_container.split(' ')
		year = pubDate[2]
		month = pubDate[0]
		day = pubDate[1]
	except Exception as e:
		print('pubDate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def techcrunchcom(page_soup, passTld):
	try:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']
	except Exception as e:
		print('title fail')
		title = ''

	websiteTitle = "TechCrunch"
	publisher = "Oath Inc."

	try:
		author_container = page_soup.find('meta', attrs={'name':"author"})
		author = author_container['content']
	except Exception as e:
		print('author fail')
		author = ''

	try:
		pubDate_container = page_soup.find('meta', attrs={'name':"timestamp"})
		pubDate = pubDate_container['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]
	except Exception as e:
		print('pubDate fail')
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def pornhubcom(page_soup, passTld):
	try:
		titleContainer = page_soup.find('meta', attrs={'name':"twitter:title"})
		title = titleContainer['content']
	except Exception as e:
		title = ''

	try:
		authorContainer = page_soup.find('a', attrs={'class':"usernameLink"})
		author = authorContainer.text
	except Exception as e:
		author = ''

	websiteTitle = "Pornhub"
	publisher = "Pornhub.com"

	year = ''
	month = ''
	day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)

def default_(page_soup, passTld):
	print('Running default scan')
	if page_soup.find('meta', attrs={'property':"og:title"}) != None:
		title_container = page_soup.find('meta', attrs={'property':"og:title"})
		title = title_container['content']

	elif page_soup.h1.text != None:
		title = page_soup.h1.text.strip()

	# elif page_soup.title.text != None:
	# 	title = page_soup.title.text.strip()

	else:
		title = ''

	try:
		publisher = passTld
	except Exception as e:
		publisher = ''

	if page_soup.find('meta', attrs={'name':"Author"}) != None:
		authorContainer = page_soup.find('meta', attrs={'name':"Author"})
		author = authorContainer['content']

	elif page_soup.find('meta', attrs={'name':"article:author_name"}) != None:
		authorContainer = page_soup.find('meta', attrs={'name':"article:author_name"})
		author = authorContainer['content']

	elif page_soup.find('span', attrs={'itemprop':"name"}) != None:
		authorContainer = page_soup.find('span', attrs={'itemprop':"name"})
		author = authorContainer.text.strip()

	else:
		author = ''

	if page_soup.find('meta', attrs={'property':"og:site_name"}) != None:
		websiteTitleContainer = page_soup.find('meta', attrs={'property':"og:site_name"})
		websiteTitle = websiteTitleContainer['content']

	else:
		websiteTitle = ''

	#finding the date
	if page_soup.find('meta', attrs={'property':"og:pubdate"}) != None:
		pubDateContainer = page_soup.find('meta', attrs={'property':"og:pubdate"})
		pubDate = pubDateContainer['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	#page_soup.find('meta', attrs={'property':"og:pubdate"}) == None and 
	elif page_soup.find('meta', attrs={'property':"article:published_time"}) != None:
		pubDateContainer = page_soup.find('meta', attrs={'property':"article:published_time"})
		pubDate = pubDateContainer['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	elif page_soup.find('meta', attrs={'property':"og:article:published_time"}) != None:
		pubDateContainer = page_soup.find('meta', attrs={'property':"og:article:published_time"})
		pubDate = pubDateContainer['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	elif page_soup.find('meta', attrs={'name':"DC.date.issued"}) != None:
		pubDateContainer = page_soup.find('meta', attrs={'name':"DC.date.issued"})
		pubDate = pubDateContainer['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	elif page_soup.find('span', attrs={'class':"pb-timestamp"}) != None:
		pubDateContainer = page_soup.find('span', attrs={'class':"pb-timestamp"})
		pubDate = pubDateContainer['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	elif page_soup.find('meta', attrs={'name':"parsely-pub-date"}) != None:
		pubDateContainer = page_soup.find('meta', attrs={'name':"parsely-pub-date"})
		pubDate = pubDateContainer['content']
		year = pubDate[0:4]
		month = pubDate[5:7]
		day = pubDate[8:10]

	else:
		year = ''
		month = ''
		day = ''

	return formData(title, author, publisher, websiteTitle, year, month, day)