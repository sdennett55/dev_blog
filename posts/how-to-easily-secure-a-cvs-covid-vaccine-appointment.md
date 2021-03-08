---
title: How to easily secure a CVS COVID-19 vaccine appointment
description: Easily secure a CVS COVID-19 vaccine appointment with the press of a button.
publishedDate: 3/7/2021
---

# How to easily secure a CVS COVID-19 vaccine appointment

Normally, this blog is targetted to web developers, but besides the very last blurb, this particular post is for a general audience.

A lot of Americans have learned that securing a COVID-19 vaccine appointment has been **tough**...to put it lightly. Every time you think you finally found some availability, it's already gone in seconds or sometimes milliseconds before you can book it. You can easily spend hours refreshing the page and waiting for your chance to strike and never hit gold. It's wildly infuriating, and what's worse is peoples' lives are at stake!

Incredibly, the process on the CVS website is still much better and more intuitive than most if not all of the existing government websites for booking vaccine appointments.

Fortunately for CVS customers, there is a solution for even non-techies to **allow the CVS website to keep searching for vaccine availability for you** without you having to manually refresh the page and click on any buttons yourself. This technique should only be attempted during the normal working hours of your local CVS stores. Using a desktop or tablet device is also easier than attempting this on mobile.

## Steps to enable automatic searching of vaccine appointment availability

1. Go to the <a href="https://www.cvs.com/vaccine/intake/store/cvd-schedule?icid=coronavirus-lp-vaccine-al-statetool" target="_blank" rel="noopener noreferrer">schedule an appointment page on CVS.com</a> and fill out the survey
2. Once you reach the "Schedule dose" page, enter your zip code, but don't search yet
3. Drag this link to your bookmarks bar: <a id="bookmark-icon" title="Download" onclick="return false;" class="" href="javascript:(function()%7Bvar%20requestCount%20%3D%201%3B%0Avar%20startTime%20%3D%20new%20Date()%3B%0Avar%20timeSpent%3B%0A%0Afunction%20hasGreenBgColor(bool)%20%7B%0A%20%20return%20bool%20%3F%20document.querySelector('.header-content-wrapper').style.background%20%3D%20'%235bd65b'%20%3A%20document.querySelector('.header-content-wrapper').style.background%20%3D%20''%3B%0A%7D%0A%0Aasync%20function%20retry()%20%7B%0A%20%20%20%20hasGreenBgColor(false)%3B%0A%20%20%20%20document.querySelector('button%5Baria-label%3D%22submit%20search%22%5D').click()%3B%0A%7D%0Aretry()%3B%0A%0Avar%20targetNode%20%3D%20document.querySelector('.store-list-container')%3B%0A%0Avar%20config%20%3D%20%7B%20subtree%3A%20true%2C%20attributes%3A%20true%2C%20childList%3A%20true%20%7D%3B%0A%0Avar%20callback%20%3D%20function(mutationsList)%20%7B%0A%20%20var%20hasFoundAppt%20%3D%20mutationsList.filter(x%20%3D%3E%20x%3F.type%20%3D%3D%3D%20'attributes'%20%26%26%20x%3F.target%3F.ariaLabel%20%3D%3D%3D%20'Show%20available%20times').length%20%3E%200%3B%0A%20%20if%20(hasFoundAppt)%20%7B%0A%20%20%20%20document.querySelector('%23availableTimes0').click()%3B%0A%20%20%7D%0A%0A%20%20var%20hasFoundTime%20%3D%20mutationsList.filter(x%20%3D%3E%20x%3F.type%20%3D%3D%3D%20'attributes'%20%26%26%20x%3F.target%3F.id%20%3D%3D%3D%20'timeSlot0_0').length%20%3E%200%3B%0A%20%20if%20(hasFoundTime)%20%7B%0A%20%20%20%20hasGreenBgColor(true)%3B%0A%20%20%20%20document.querySelector('%23timeSlot0_0').click()%3B%0A%20%20%20%20document.querySelector('.submit.btn-control').click()%3B%0A%20%20%20%20observer.disconnect()%3B%0A%20%20%20%20return%3B%0A%20%20%7D%0A%0A%20%20if%20(mutationsList.length%20%3D%3D%3D%201%20%26%26%20mutationsList%5B0%5D%3F.removedNodes%3F.%5B0%5D%3F.data%20%3D%3D%3D%20%22%20None%20of%20your%20selected%20vaccines%20are%20available%20nearby%22)%20%7B%0A%20%20%20%20if%20(document.querySelector('main').innerText.includes('re%20sorry'))%20%7B%0A%20%20%20%20%20%20setTimeout(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20requestCount%2B%2B%3B%0A%20%20%20%20%20%20%20%20timeSpent%20%3D%20(new%20Date()%20-%20startTime)%20%2F%201000%3B%0A%20%20%20%20%20%20%20%20console.log(%60Request%20Count%3A%20%24%7BrequestCount%7D%2C%20Time%20spent%3A%20%24%7BtimeSpent%7Ds%60)%3B%0A%20%20%20%20%20%20%20%20retry()%3B%0A%20%20%20%20%20%20%7D%2C%201000)%0A%20%20%20%20%7D%0A%20%20%7D%20%0A%7D%3B%0A%0Avar%20observer%20%3D%20new%20MutationObserver(callback)%3B%0Aobserver.observe(targetNode%2C%20config)%3B%7D)()">CVS Vaccine Appointment Finder</a>. 

> <small><em>If you're not sure where your bookmarks bar is, check out this resource on [how to show the bookmarks bar in any browser](https://www.computerhope.com/issues/ch001917.htm)</em></small>

4. On the "Schedule dose" page with your zip code entered, click our newly created "CVS Vaccine Appointment Finder" bookmark

That's it! Let the bookmark do it's thing and if an appointment is found, the page will stop refreshing and the header of the website will turn green and prompt you to schedule a time for your second dose. 

This bookmark will select the first available time for the first dose by default to increase your chances of securing the appointment. At this point, there's no need to rush the rest of the process to fill out your personal and health insurance information, so take your time!

## Gotchas

Please note that **the CVS website only allows a single user to check for availability 270 times** before they serve you a "Technical difficulties" error. Once your reach this error, you won't be able to keep checking availability for several hours. If you weren't able to secure an appointment, try this process again in another browser or on a different device.

Also note that by default, the CVS website checks for availability **up to 35 miles of the given zip code**. Sometimes you may get a result that you're not willing or capable to travel to.

## Other tips

To increase your changes of securing an appointment, check the CVS website for availability between 6–7am. If you're not a morning person, check during normal working hours 9am–5pm when folks might be cancelling their appointments.

## For the interested techies: the pre-bookmarklet-ified code

```
var requestCount = 1;
var startTime = new Date();
var timeSpent;

function hasGreenBgColor(bool) {
  return bool ? document.querySelector('.header-content-wrapper').style.background = '#5bd65b' : document.querySelector('.header-content-wrapper').style.background = '';
}

async function retry() {
    hasGreenBgColor(false);
    document.querySelector('button[aria-label="submit search"]').click();
}
retry();

var targetNode = document.querySelector('.store-list-container');

var config = { subtree: true, attributes: true, childList: true };

var callback = function(mutationsList) {
  var hasFoundAppt = mutationsList.filter(x => x?.type === 'attributes' && x?.target?.ariaLabel === 'Show available times').length > 0;
  if (hasFoundAppt) {
    document.querySelector('#availableTimes0').click();
  }

  var hasFoundTime = mutationsList.filter(x => x?.type === 'attributes' && x?.target?.id === 'timeSlot0_0').length > 0;
  if (hasFoundTime) {
    hasGreenBgColor(true);
    document.querySelector('#timeSlot0_0').click();
    document.querySelector('.submit.btn-control').click();
    observer.disconnect();
    return;
  }

  if (mutationsList.length === 1 && mutationsList[0]?.removedNodes?.[0]?.data === " None of your selected vaccines are available nearby") {
    if (document.querySelector('main').innerText.includes('re sorry')) {
      setTimeout(() => {
        requestCount++;
        timeSpent = (new Date() - startTime) / 1000;
        console.log(`Request Count: ${requestCount}, Time spent: ${timeSpent}s`);
        retry();
      }, 1000)
    }
  } 
};

var observer = new MutationObserver(callback);
observer.observe(targetNode, config);
```