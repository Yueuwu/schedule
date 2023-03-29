from typing import Text
import requests
import lxml.html
import json
#!flask/bin/python
from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def parse_room(url):
    api = requests.get('https://schedule.nspu.ru/'+url)
    tree = lxml.html.document_fromstring(api.text)
    text_original = tree.xpath('//*[@id="center"]/div/div[1]/h2/text()')
    x = text_original[0].find("Корпус 1")
    if x!=-1:
        return('Корпус 1 (Главный)')
    else:
        x = text_original[0].find("Корпус 3")
        if x!=-1:
            return('Корпус 3 (ИФМИТО-ФФК-ИФМИП)')

def parse(url):
    api = requests.get(url)
    tree = lxml.html.document_fromstring(api.text)
    td = ['color', 'color1', 'self', 'today']

    text_original = []
    for e in td:
        f = f'//*[@id="{e}"]/text()[1]'
        text_original += tree.xpath(f)

    teacher = []
    for e in td:
        f = f'//*[@id="{e}"]/a[1]/text()'
        teacher += tree.xpath(f)

    teacherLink = []
    for e in td:
        f = f'//*[@id="{e}"]/a[1]/@href'
        teacherLink += tree.xpath(f)

    classroom = []
    for e in td:
        f = f'//*[@id="{e}"]/a[2]/text()'
        classroom += tree.xpath(f)
    
    classroomLink = []
    for e in td:
        f = f'//*[@id="{e}"]/a[2]/@href'
        classroomLink += tree.xpath(f)
    
    format = []
    for e in td:
        f = f'//*[@id="{e}"]/text()[3]'
        format += tree.xpath(f)
    
    day = ['Понедельник ', 'Вторник ', 'Среда ', 'Четверг ','Пятница ','Суббота ']
    time  = ['8:30-10:00','10:10-11:40','12:10-13:40','14:10-15:40','15:50-17:20','17:30-19:00','19:10-20:40','20:50-22:20']
    global structure 
    structure = {'Понедельник ':{}, 'Вторник ':{}, 'Среда ':{}, 'Четверг ':{},'Пятница ':{},'Суббота ':{}}
    counter = -1
    counter_add = 0
    for i in text_original:
        counter+=1
        for j in day:
            if i==j:
                day_i = i
        for j in time:
            if i==j:
                structure[day_i][i] = {"subject": text_original[counter+1]}
                structure[day_i][i]['teacher'] = teacher[counter_add]
                structure[day_i][i]['teacherLink'] = teacherLink[counter_add]
                structure[day_i][i]['classroom'] = classroom[counter_add]
                structure[day_i][i]['classroomLink'] = classroomLink[counter_add]
                structure[day_i][i]['building '] = parse_room(classroomLink[counter_add])
                structure[day_i][i]['format'] = format[counter_add]
                counter_add+=1
        print(i)


    data = json.dumps(structure, indent=3)
    print(data)
    print(json.loads(data))
    

@app.route('/todo/api/v1.0/data', methods=['GET']) #curl -i http://localhost:5000/todo/api/v1.0/data
def get_tasks():
    return jsonify({'data': structure})

if __name__ == '__main__':
    url = "https://schedule.nspu.ru/group_shedule.php?id=1889"
    parse(url)
    app.run(debug=True)