# ForeeCoffeeShop
ForeeCoffee is a final project in the form of web-based coffee shop ordering for mobile, inspired by one of the famous coffee shop in Indonesia, "Fore Coffee"

<img src="https://drive.google.com/uc?export=download&id=1DTSG8iiIi70KKaO6PE0cXW5uQot7wrsS" alt="Logo Foree" width=20%>

# The Team
|Name|NIM|Tugas|
|----|-----|--------|
|Michaela Sheren Sugianto|1121007|Menu (Coffee, Non-Coffee, Donut - Admin, Customer) (FE), Order (BE), Navbar (BE, FE)
|Alexander Juan Dicoza|1121010|Payment Gateway (BE), Order (BE, FE), View Order (BE, FE), Login (BE), Product Branch (BE)
|Felicia Kiani Lestari|1121017|Menu (BE), Payment (FE), Paymet Gateway (FE), Edit Menu (BE, FE), Insert Menu (Be, FE), Github Readme
|Vincent Christian Laurent|1121020|Login Admin Customer (BE, FE), Register (BE, FE), Branch (FE), Email (BE), Cart (BE)

# Features
* Sign Up / Login (With Authentication and Authorization)
* Order Drinks and Food
* Payment
* Customer and Admin UI
* Automatic Sales Recapitulation for Investors

# Architecture
MVC (Model-View-Controller) is used in this project, which is an architectural pattern that divides an application into the model, view, and controller—the three primary logical components.

# Framework

## Tailwind
A CSS framework that offers a collection of ready-made utility classes to facilitate the rapid and effective creation of contemporary online interfaces.

## React
An open-source JavaScript library that is mostly used to create user interfaces (UIs) for online applications.

## Gin
A simple, quick, and lightweight HTTP web framework for Go that makes building online apps easy. Because of its ease of use and speed, it's frequently utilized to create RESTful APIs.

# Design Pattern

## Singleton
A creational design pattern that permits you to give a global access point to a class's single instance while guaranteeing that class has exactly one

## State
A behavioral design pattern that allows an object to alter its behavior when its internal state changes.

## Adapter
A structural design pattern that allows objects with incompatible interfaces to collaborate.

# Caching
Redis is used to store the products images with the benefits of:
* Faster Retrieval
* Reduced Server Load

# Email Features in Go
* GoMail: used for sending emails
* GoRoutine: used for working with Redis
* GoCRON: used for scheduling tasks or jobs
* GoRedis: used for enabling concurrent execution of functions or tasks

# User Interface
App UI Documentation: [Figma Foree Coffee Shop UI](https://www.figma.com/file/IMSI7mXr9GAQ10HVOo0gO7/Foree-Coffee?type=design&node-id=0%3A1&mode=design&t=3a3SF7T7nwO5wTPD-1)

## Admin UI:
<img src="https://drive.google.com/uc?export=download&id=1cNExIxI8XDjzGU-Y8UzbR6Oo0EinONYO" alt="Forree UI Admin" width="100%">

## Customer UI:
<img src="https://drive.google.com/uc?export=download&id=1OcrNWTDbdIu14hto0pR9G6c3UMPoyNlW" alt="Forree UI Admin" width="100%">
<img src="https://drive.google.com/uc?export=download&id=1WIZX2q40bY7a7tSjIdLLz7vMQ7FKOCpa" alt="Forree UI Admin" width="70%">

# Video Presentation Link
Link: https://drive.google.com/file/d/1I5ussw3Pn72NqMMpY2bXR5hT9VPezRcz/view?usp=sharing
