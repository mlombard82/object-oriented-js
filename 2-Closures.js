// HOW TO USE THESE NOTES: 
// Use these notes to follow along with the lesson. You can run the code in this file to reproduce what you see in the videos. 

/* Closures: Put simply every function should have access to all the variables from all the scopes that 
sorround it. A closure is any function that somehow remains available after those outer scopes have returned.

This is the saga code from earlier.*/

// var hero = aHero();                           
// var newSaga = function(){              
//   var foil = aFoil();
//   var saga = function(){
//     var deed = aDeed();
//     log(hero+deed+foil);
//   };
//   saga();
//   saga();
// };
// newSaga();
// newSaga();

// Lets refactor it, and run a new version on our simulated interpreter.

   var sagas = [];              /* 1. lets make a global variable called sagas that will store an array for us,
                                   and we'll use this array to eventually store saga functions. let's try running this
                                   code with our simulated interpreter again.
// var hero = aHero();             2. then, the line that assigns a new value to the hero variable will run and
                                   create some random string, in this case 'Boy', to string in the hero variable. */
// var newSaga = function(){       3. yet another assignment, so a function object gets placed into the newSaga variable.       
//   var foil = aFoil();           5. Invoquing any function creates a new context, and that context is where
                                  // all the lookups will start. We add the variable foil to this context. foil is
                                  // randomly selected to be 'Rat'
     sagas.push(function(){     /*Then all we would need in order to have permanent access to each of these
                                   saga functions is topush them into that global array. At point we could choose 
                                   to access these functions even outside the scope they were defined within.
                                   The invocations of those saga functions will actually happen after the
                                   newSaga function that created them was done running
                                   6. Here is the interesting
                                   part: the sagas array is now stored in a global variable, which means,
                                   calls to 'push' should have a lasting effect on it that persists even
                                   after newSaga has finished running. The function(){...} syntax returns
                                   a function object, which is pushed to the end of the sagas array(from the f to
                                   the end curly brace is the definition of a function object, and that is the
                                   value that we're pushing into the sagas array)*/
//     var deed = aDeed();         9. deed = 'Eyes'
//     log(hero+deed+foil);        10. we log a run on all 3 variables: "BoyEyesRat"
//   });                           7. When this line of code runs, that means that a new function has been
                                  // added to the sagas array, and even though that {f} is being referenced by
                                  // a variable in the global scope, the function itself has the innermost scope
                                  // access because is fundamentally an innermost function that originated inside
                                  // the newSaga function.
// };
// newSaga();                      4. and we are ready to do a lookup of newSaga, find this function object, and
                                 // invoque it because of those 2 parens. 
   sagas[0]();                   /*8. So we have reached the big question: what do you think is going to happen
                                     when you try to run one of these innermost functions that was created in the
                                     middle context but is now being accessed from the global context?
                                     Hint: the context for a function will always be created as a child of the
                                     context that it was defined within.
                                       */
   sagas[0]();                  //11. completed the first sagas call, we move again to the global context and
                                //   run it again, which will mean a 2nd, totally separate innermost context
                                // within newSaga
// newSaga();                     12. Here we are about to run the newSaga function for a 2nd time, and the
                                // important issue here is that it will create a brand new middle context, will
                                // will be the home for a new 'foil' variable, and 2 new innermost contexts.
                                // Also, as a result of the 2nd call to .push,
                                //the sagas array is now going to have 2 different function objects in it.
   sagas[0]();                  //13. Running the first inner sagas function again, will create another, 3rd,
                                // innermost context inside the first newSaga context.
                                // The first of the saga functions was created in the first of the newSaga context.
   sagas[1]();                  // 14. We are at another interesting juncture. about to run
                                // the second sagas function for the first time. What will happen? As usual
                                // it will create a new context for the function invocation but this time it
                                // will exist within the second of the middle contexts.
   sagas[0]();
/* 
what if we could somehow keep a reference to each of the saga functions that we create during the invocation
of newSaga? and we could keep them around forever, such that they were available long after those newSaga
calls had completed and returned?
*/

var sagas = []; // global array to store saga function objects, accessible outside of the newSaga function 
var hero = aHero();
var newSaga = function(){
	var foil = aFoil();
	//var saga = function(){   -> now need to push saga function objects into the sagas array 
	sagas.push(function(){  
		var deed = aDeed();
		log(hero+deed+foil);
	});
};
newSaga();
sagas[0](); // invokes the first function stored in sagas array
sagas[0]();

newSaga();
sagas[1]();

/*lAST FEW WORDS ON CLOSURES: Anytime you see a function with an input parameter that is static, meaning, you don't expect the 
parameter to take a new value every time you call the function, that's an opportunity to refactor your code,
such that you store the value in a variable from an outer scope. Because of the way Closures work,
the inner function will always have access to the outer scope variable, even after the outer function returns.*/
