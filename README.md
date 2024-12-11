# Mission to Mars API Workshop 🚀

Cadet, you've joined us at a critical point, and we need your help. A bit of background first perhaps...

Well... it's all a bit of a mess. The popularity of selfie-sticks, combined with the technological advances of AI, means that we have arrived at a critical point in human evolution - SENTIENT SELFIE STICKS! 🤖

At first, it was all fine - better selfies brought world peace ✌️

But soon, taking selfies wasn't enough - these robotic parasites rose up and now are about to become our overlords! We need to leave this planet, now! Luckily, we've been planning this escape for a while and have a fully kitted out, top of the line, pimped out spaceship 🚀

We need to launch it... pronto.

The only problem is that we can't figure out the launch codes for the ship. Somebody must have changed them and then forgotten about it... can you help us? Our ship is full of our crew including our trusty AI IT system (don't worry, it's one of the good ones). We need you to work out our launch codes, submit them to the system, and then (fingers crossed) get us out of here and heading to Mars... no sentient selfie sticks there.

Use the fetch protocol you learned at the academy to interact with our mission API, and refer to the information in this manual to navigate it.

When you submit a launch code, you'll have an ancient graphic returned (I believe they used to pronounce it "JIF"). You need to display it in the `<img>` element in the HTML file. This graphic will show you whether you've completed the task successfully or whether you need to try again.

## Important Instruction

Do not, under any circumstances, look through these files until AFTER you've finished the challenge! It will mean you don't learn much and don't need to engage fully with the problem if you sneak a peek at the underlying data.

Do you promise not to? 🤨

Ok, I believe you! 😊

## Setting up the server

To run this project, use a server like LiveServer to launch the `index.html` file. This will allow you to make requests to the API. If you haven't got this installed, you can use the [School of Code Extension Pack](https://marketplace.visualstudio.com/items?itemName=sochq.school-of-code-bootcamp-extensions) in VSCode to install it.

Your code should go in the `launch-sequence.js` file.

To make a call to the API, use `fetch` to the base url `/api` and add to it to reach the relevant endpoint.

Good luck cadet!

## API training documentation for new mission recruits

Use the following endpoint URL:

```bash
/api
```

### GET request to `/logs`

Returns a list of all the logs.

### GET request to `/personnel/:id`

Returns the relevent personnel record matching the id passed in as a path parameter.

### GET request to `/messages`

This endpoint accepts the following query parameter:

- `to` (*required*) - searches using which personnel id sent the message; returns all messages sent by the relevant person.

### GET request to `/hint`

Returns pertinent information about sending the correct code.

### POST request to `/codes`

Accepts a JSON object in the body of the request with the correct property:

```js
{
    "enter": "CODE_GOES_HERE"
}
```

Returns a graphic that will show you whether you've completed the task successfully or whether you need to try again. Make sure you use the DOM to display this graphic in the HTML file.

Good luck, cadet! Earth's fate is in your hands! 🌍✨
