#!/usr/bin/env python2
#-*- coding: utf-8 -*-
from __future__ import print_function
import tweepy
import json
from pymongo import MongoClient
import sys,os,re,string
from pprint import pprint
from sklearn.feature_extraction.text import CountVectorizer
import requests
import pandas as pd  
import csv

MONGO_HOST= 'mongodb://31.207.34.34:27017'
client = MongoClient(MONGO_HOST)


db = client.twitterdb


emoticons_str = r"""
    (?:
        [:=;] # Eyes
        [oO\-]? # Nose (optional)
        [D\)\]\(\]/\\OpP] # Mouth
    )"""

regex_str = [
    emoticons_str,
    r'<[^>]+>', # HTML tags
    r'(?:@[\w_]+)', # @-mentions
    r"(?:\#+[\w_]+[\w\'_\-]*[\w_]+)", # hash-tags
    r'http[s]?://(?:[a-z]|[0-9]|[$-_@.&amp;+]|[!*\(\),]|(?:%[0-9a-f][0-9a-f]))+', # URLs
 
    r'(?:(?:\d+,?)+(?:\.?\d+)?)', # numbers
    r"(?:[a-z][a-z'\-_]+[a-z])", # words with - and '
    r'(?:[\w_]+)', # other words
    r'(?:\S)' # anything else
]

tokens_re = re.compile(r'('+'|'.join(regex_str)+')', re.VERBOSE | re.IGNORECASE)
emoticon_re = re.compile(r'^'+emoticons_str+'$', re.VERBOSE | re.IGNORECASE)

def tokenize(s):
    return tokens_re.findall(s)

def preprocess(s, lowercase=False):
    tokens = tokenize(s)
    if lowercase:
        tokens = [token if emoticon_re.search(token) else token.lower() for token in tokens]
    return tokens
 





pat = re.compile(r"(?:@[\w_]+)|(?:\#+[\w_]+[\w\'_\-]*[\w_]+)|http[s]?://(?:[a-z]|[0-9]|[$-_@.&amp;+]|[!*\(\),]|(?:%[0-9a-f][0-9a-f]))+")

for t in db.twitter_search.find():
    tweet_corrige = ""
    for i in (preprocess(t['tweet_complet'])):
        if re.search(pat,i):
            continue
        tweet_corrige += i + " "
    db.twitter_search.update(
    {"_id": t["_id"]}, 
    {"$set": {"tweet_corrige": tweet_corrige}})

# pprint(tweet_corrige)

# db.twitter_search.update(
#     {"_id": tt["_id"]}, 
#     {"$set": {"tweet_corrige": tweet_corrige}})

# for i in db.twitter_search.find():
#     print(i['tweet_complet'].lower())


