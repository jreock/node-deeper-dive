/*const MyObject = {
    prop1: "value1",
    prop2: "value2",
    prop3: "value3"
 };

 const myProc = ({prop1,prop2}) => {
    console.log(prop1, prop2);
 }

 myProc(MyObject); 

 const {prop1, prop2, prop3} = MyObject;

 console.log(prop3);
*/

 const nesGame = {
    title: "Ninja Gaiden",
    year: "1990",
    review1: "Best game ever…",
    review2: "Meh",
    review3: "Not Zelda",
    review4: "Better than ET for Atari"
 }

 const {title, year, ...reviews} = nesGame;
 console.log(reviews);
 
