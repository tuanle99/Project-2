# Project-2

# Family manager 

## Table of Contents 

* [Overview](#Overview)
* [Access](#Access)
* [User Story](#User-Story)
* [Details](#Details)
* [Walk Through](#Walk-Through)
* [Team](#Team)

## Overview

The Family manager (FM) application allows users to ...

## Access

You can find the deployed webpage here: ............................

You can find the GitHub repo here: https://github.com/tuanle99/Project-2/pull/50

## User Story

AS a User

I WANT to be able to get specific data from the family manager app, I want to get specific tasks assigned to me, I want to get all the information about the budget that will need to be spent.

This application allows users 

## Walk Through

In order to use this application:

1. Enter your 

## Team

This application was developed by the Regal swans team, consisting of four team members:
* Tuan, @tuanle99
* Charles, @charles198618
* Sammy, @smcmillan28
* Ryan, @wryanj




Family Manager

- User
    - Parent (admin)
    - Child
- To do list
    - Table view 
        - Task, date, who assign to (family member)
- Finance
    - montly spending
    - subscription

- Project
    - View a section of the to do list base on the project category

Task
- id
    - primary key
- task title
- task description
- assigned to
    - user_id
    - foreign key
- created by
    - user_id
    - foreign key
- due date
- project_id
    - foreign key

Project
- id
- title
- due date (optional)
    - can be null

User
- id
- name
- family type
- date of birth