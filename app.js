#!/usr/bin/env node
const http = require("http");
const readline = require("readline");
const input = readline.createInterface(process.stdin, process.stdout);
const myAPIKey = process.env.myAPIKey;
const baseURL = "http://api.weatherstack.com/";
console.log("Введите название города и получите текущую погоду");
input.on("line", (data) => {
    const city = data.trim().replace(/ /g, "%20");
    http.get(
        `${baseURL}current?access_key=${myAPIKey}&query=${city}`,
        (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                error = new Error(
                    "Request Failed.\n" + `Status Code: ${statusCode}`
                );
                console.error(error.message);
            }
            res.setEncoding("utf8");
            let rawData = "";
            res.on("data", (chunk) => {
                rawData += chunk;
            });
            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log("Погода:\n", parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    );
});

// // Current Weather API Endpoint
// http://api.weatherstack.com/current
//     ? access_key = YOUR_ACCESS_KEY
//     & query = New York
