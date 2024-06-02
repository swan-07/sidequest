const mini_quests = [
    "Give someone a compliment",
    "Give someone a hug",
    "Write a thank you note to a friend",
    "Send a motivational text to a friend",
    "Smile at 3 strangers",
    "Hold the door open for someone",
    "Pick up litter in your neighborhood",
    "Call a family member just to say hello",
    "Share your lunch with a coworker",
    "Leave a positive review for a local business",
    "Compliment a coworker's work",
    "Leave a kind note on someone's desk",
    "Say something nice to a cashier",
    "Bake cookies for your neighbors",
    "Water a plant for a friend",
    "Help someone with their homework",
    "Share a positive news story",
    "Give a friend a book you enjoyed",
    "Compliment someone's outfit",
    "Offer to walk someone's dog",
    "Send a letter to a friend",
    "Compliment a friend's cooking",
    "Help someone find a job",
    "Give directions to a tourist",
    "Help an elderly person cross the street",
    "Give up your parking spot for someone",
    "Leave a treat for your mail carrier",
    "Compliment a friend's hairstyle",
    "Offer to take a photo for a tourist",
    "Compliment a stranger's smile",
    "Help someone fix something",
    "Offer to edit a friend's resume",
    "Help someone with their tech problems",
    "Compliment someone's artwork",
    "Give a friend a handmade gift",
    "Offer to help clean up after a party",
    "Compliment a stranger's pet",
    "Help someone organize their space",
    "Compliment a friend's sense of humor",
    "Share your notes with a classmate",
    "Compliment a coworker's effort",
    "Leave a positive comment on social media",
    "Help someone plan a trip",
    "Compliment a musician's performance",
    "Offer to proofread a friend's work",
    "Help someone decorate for a party",
    "Compliment a stranger's shoes",
    "Lend a friend a book",
    "Help someone with their workout routine",
    "Compliment a friend's writing",
    "Write a kind message to someone online",
    "Compliment someone's garden",
    "Help a friend pack for a trip",
    "Share a healthy recipe with a friend",
    "Help someone set up their new phone",
    "Compliment a coworker's idea in a meeting",
    "Help someone find a good podcast",
    "Leave a positive note in a library book",
    "Compliment a friend's drawing",
    "Help a neighbor with a small task",
    "Share a funny video with a friend",
    "Give someone a genuine smile",
    "Compliment someone's work ethic",
    "Help a friend with their grocery shopping",
    "Send a postcard to a friend",
    "Compliment a friend's pet",
    "Help someone write a cover letter",
    "Share a motivational quote with someone",
    "Compliment a friend's photography",
    "Help someone set up their computer",
    "Share an interesting article with a friend",
    "Compliment a friend's musical taste",
    "Help someone choose an outfit",
    "Share a travel tip with a friend",
    "Compliment someone's cooking",
    "Help a friend brainstorm ideas",
    "Compliment a coworker's presentation",
    "Share a DIY project idea with a friend",
    "Help someone with a small repair",
    "Compliment a friend's handwriting",
    "Help a friend clean their car",
    "Share a book recommendation",
    "Compliment someone's sense of style",
    "Help someone with a puzzle",
    "Share a fun fact with a friend",
    "Compliment a friend's joke",
    "Help a friend organize their photos",
    "Compliment a friend's video",
    "Help someone learn a new app",
    "Share a memory with a friend",
    "Compliment a friend's painting",
    "Help someone with their resume",
    "Compliment a friend's singing",
    "Help a friend plan a day out",
    "Share a workout tip with a friend",
    "Compliment someone's handwriting",
    "Help someone find a recipe",
    "Share a movie recommendation",
    "Compliment a friend's poem",
    "Help a friend with a game",
    "Compliment someone's creativity",
    "Help a friend edit a video",
    "Share a positive story with a friend",
    "Compliment a friend's enthusiasm"
]

  
  document.addEventListener("DOMContentLoaded", () => {
    changeText();
  });
  
  
function changeText() {
    randomQuest = mini_quests[Math.floor(Math.random() * mini_quests.length)];
    let labelElement = document
        .getElementById("label");
    labelElement.innerHTML = randomQuest;
}

const button1 = document.getElementById("button1");
button1.addEventListener("click", function() {
  changeText();
})

const button2 = document.getElementById("button2");
button2.addEventListener("click", function() {
  chrome.runtime.sendMessage({ type: "done" });
  window.close();
})