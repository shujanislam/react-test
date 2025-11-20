:navbar: Home , About
:sidebar: [Getting Started] {Prerequisites, Installation} | [Customs] {navbar, sidebar, footer} | [Special] {API playground, Assessments}

:default:

# DevOnBoard Documentation

Get your docs live fast and start fixing what matters right away.

## Getting Started

Noting to look at here, it's fairly simple!

## Prerequisites

:enddefault:

:warning: {⚠️ Docker must be installed and setup successfully!}

:default:

## Installation

- Download the executable file
- Initialize the tool

:enddefault:

:bash: {devonboard init}

:default:

- To run the documentation locally
  :enddefault:

:bash: {devonboard docs}
:info: {The Docs will be running on https://127.0.0.1:5173}

:default:

- To start the tool
  :enddefault:

:bash: {devonboard start}

:success: {Tool setup is successful!✅}

:default:

# Customs

Navbar
:enddefault:

:code: {:navbar: option1 , option1 }

:default:
Sidebar
:enddefault:

:code: {:sidebar: [Item1] {Subitem1-1, Subitem1-2} | [Item2] {Subitem2-1, Subitem2-2, Subitem2-3}}

:default:
Footer
:enddefault:

:code: {:footer: Option1 , Option2}

:default:
Images
:enddefault:
:img: https://wallup.net/wp-content/uploads/2019/09/08/455469-anime-girl-beautiful-cute-beauty-happy-lovely-love-girls.jpg

:code: {:img: online/url}

:default:

# DevOnBoard Specials

API Routes
:enddefault:

:route: GET /api/route | {body}

:route: POST /api/route | key : value, hello : world, key2 : value2

:code: {:route: GET /api/route | {body}}
:code: {:route: POST /api/route | key : value, hello : world, key2 : value2}

:default:
Assessments
:enddefault:

:assesment: [Docker assesment], {try out a docker pull command}, <docker-field>, (if(textfield == "docker pull") { return true; } else { return false; })

:code: {:assesment: [Docker assesment], {try out a docker pull command}, <docker-field>, (if(textfield == "docker pull") { return true; } else { return false; })}



:footer: Contact Us , FAQs
