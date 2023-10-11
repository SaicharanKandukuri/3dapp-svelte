name_file="names.txt"
lat_file = "lat.txt"
lng_txt = "lng.txt"

nf = []
lf = []
lof = []

with open(name_file, 'r') as nd:
    nf = nd.readlines()

with open(lat_file, 'r') as nd:
    lf = nd.readlines()

with open(lng_txt, 'r') as nd:
    lof = nd.readlines()

for i in range(len(nf)):
    print(f"{nf[i].strip()} & {lf[i].strip()} & {lof[i].strip()} \\\\")
