from flask import Flask, request
from flask_cors import CORS
import sys
# sys.path.append('../src')
# sys.path.append('..')

import org_net 
import networkx as nx
import asyncio

G = nx.read_graphml('./data/orgnetwork.graphml')

G_dgl, id_key = org_net.clean_graph_pipeline(G) # Create synthetic graph and pass to the clean pipeline
inv_graph = org_net.invert_graph(G_dgl, save=True)

model = org_net.train_pipeline(G_dgl, epochs=300)

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    name = request.args.get('name')
    year = request.args.get('year')
    major = request.args.get('major')
    list_of_orgs = request.args.getlist('list_of_orgs')  # For lists

    result = org_net.get_reccomendations_for_new_student(name, 
                                                        year=year, 
                                                        major=major, 
                                                        list_of_orgs=list_of_orgs)
    string_result = str(result)
    return string_result