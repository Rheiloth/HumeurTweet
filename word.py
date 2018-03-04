from __future__ import print_function
import tweepy
from pymongo import MongoClient
import sys,os,re,string
import pandas as pd  
from wordcloud import WordCloud
import matplotlib.pyplot as plt

MONGO_HOST= 'mongodb://31.207.34.34:27017'
client = MongoClient(MONGO_HOST)


db = client.twitterdb

dico = []
print("Analyse en cours....")
for i in db.twitter_search.find():
    dico.append(i['tweet_corrige'])

dico = pd.Series(dico).str.cat(sep=' ')

wordcloud = WordCloud(width=1600, height=800,max_font_size=200).generate(dico)
plt.figure(figsize=(12,10))
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.show()

image = open("cloud.jpg","w")


wordcloud.to_file(image)
print("Image enregistree sous  cloud.jpg")

image.close()
