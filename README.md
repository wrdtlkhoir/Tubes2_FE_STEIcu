# Little Alchemy Recipe Finder ⚗️
This project is deployed at https://tubes2festeicu-production.up.railway.app/. </br>
> This is a front-end repository. Please access back-end repository by clicking on [this link](https://github.com/wrdtlkhoir/Tubes2_BE_STEIcu.git).

## Overview
This project aims to get single or multiple recipe of elements in [Little Achemy 2](https://little-alchemy.fandom.com/wiki/Elements_(Little_Alchemy_2)). This project implements single and multiple recipes finder using Depth First Search (BFS), Breadth First Search (DFS), and Bidirectional Search. Multiple recipes finder is optimized using multithreading. The data used in the program is scrapped from the Little Alchemy 2 Website. User will input the method, algorithm, and number of recipes to be searched. The program will display the recipes found in form of solution tree including number of visited nodes, searching duration, and number of recipes found.

## Project Structure
```
src
├── components
│   ├── ElementNode.js
│   ├── Header.js
│   ├── Layout.js
│   ├── RecipeTree.js
│   ├── ResultsStats.js
│   ├── SearchForm.js
├── pages
│   ├── _app.js
│   ├── index.js
├── styles
│   ├── ElementNode.module.css
│   ├── Header.module.css
│   ├── Home.module.css
│   ├── Index.module.css
│   ├── Layout.module.css
│   ├── RecipeTree.module.css
│   ├── ResultsStats.module.css
│   ├── SearchForm.module.css
│   ├── globals.css
├── utils
│   ├── api.js
├── .env.local
├── .gitignore
├── Dockerfile
├── README.md
├── docker-compose.yml
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
```
## Algorithms
This is a front-end repository. Please access back-end repository by clicking on [this link](https://github.com/wrdtlkhoir/Tubes2_BE_STEIcu.git).

## Prerequisites
1. Node.js (Recommended: v18.x or later)
   - Download and install from Node.js [official website](https://nodejs.org/en
2. npm or yarn (Package Manager)
3. Docker
  
## How to Compile and Run the Program
Clone this repository from terminal with this command:
```
$ git clone https://github.com/wrdtlkhoir/Tubes2_FE_STEIcu.git
```
### Run the application on development server
Compile the program by running the following command:
```
$ docker-compose up -d
```
### Run the application after doing updates
To run the program after doing updates, you can add a build tag by using this command
```
$ docker-compose up -d --build
```
## How to use the program
After running the back-end server and front-end, users can choose searching algorithm, method, and number of nodes (for multiple recipe) then click "Search" button. The solution tree(s) later be displayed on the box next to the input buttons including number of visited nodes, searching duration, and number of recipes found.

## Available Scripts
In the project directory, you can run:
```
$ npm run dev
```
This runs the app in the development mode.

## Contributors 
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/wrdtlkhoir">
        <img src="https://avatars.githubusercontent.com/wrdtlkhoir" width="80" style="border-radius: 50%;" /><br />
        <span><b>Wardatul Khoiroh </br> 13523001</b></span>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/najwakahanifatima">
        <img src="https://avatars.githubusercontent.com/najwakahanifatima" width="80" style="border-radius: 50%;" /><br />
        <span><b>Najwa Kahani Fatima </br> 13523043</b></span>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/numshv">
        <img src="https://avatars.githubusercontent.com/numshv" width="80" style="border-radius: 50%;" /><br />
        <span><b>Noumisyifa Nabila N. </br> 13523058</b></span>
      </a>
    </td>
  </tr>
</table>

