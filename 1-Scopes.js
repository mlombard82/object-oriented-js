// HOW TO USE THESE NOTES: 
// Use these notes to follow along with the lesson. You can run the code in this file to reproduce what you see in the videos. 

// Scopes 
// Lexical scope: describes the regions in your source code where you can 
// refer to a variable by name without getting access errors
// Can understand rules of lexical scope even without running your code bc it only concerns area of code where different variable names have meaning, 
// Blocks within a function create a new lexical scope 

// Global Scope

// Global Scope starts under here 
function aHero () {  // Establish dummy global scope functions to return some words so the function calls in local scopes work
	return "Gal";
}
function aFoil () {
	return "Cow";
}
function aDeed () {
	return "Taps";
}

var hero = aHero(); /* 1. before this first line of code even runs, the interpreter will start out by setting up
                          an execution environment. Step 1 to create an in-memory global scope context to hold all
                          global variables (building up a storage system for the global scope).At this point(before 
                          any code executes), the global context is the only context that exists, so of course 
                          it is the current execution context(the one in which the interpreter starts its variable lookups in.)
                          As the first line of code runs, the interpreter builds up a new key-value mapping inside of the
                          execution context. this in order to keep track of the value that is bound to the name, hero.
                          Let's say the aHero function randomly generated the value 'Gal', which will be stored in the
                          hero variable so that 
                      hero = 'Gal' */
                    
var newSaga = function() {               /* 2.  Like the line above it, this line also implies a simple
                                asignment operation. Now, the value being assigned is a function that spans several
                                lines. For now the interpreter will ignore the body of the function(it will run when
                                the function is actually called).
                                This line of code has the effect of adding a new key-value pair to our global scope context.
                         newSaga = {f} */
                         
	var foil = aFoil();              /* 4. This line will add a new variable to the current scope
	                                       foil = "Cow" */
	var saga = function() {          /* 5. This line adds another variable to the now
	                                               current scope, this time holding a function value.
	                                       saga = {f} */
		var deed = aDeed();      /* 7. Running the saga function will build yet a new execution context
		                     and move the interpreter's lookup focus into it. This line adds a new variable
		                     to this local scope
		                               deed = "Taps" */
		log(hero+deed+foil);     /* 8. Then we do lookups on all 3 of our variables. Again, the interpreter
		                     will do this: by scanning outwards from its current context, looking for 
		                     the closest containing context that can satisfy a requested name.
		                     First it looks for 'hero', which cannot be found in the current context,
		                     or the next,and so falls through all the way to the global context, where
		                     the variable is found. The string being logged is starting to take shape.
		                     Next, it goes looking for the 'deed' variable. This one turns out to be
		                     easier for the interpreter as it finds it locally without needing to consider
		                     any of the fall-through scopes.So far ("GalEyes..). Lastly, the interpreter
		                     does a lookup for foil, which falls out of the local scope but is found
		                     in the middle scope. Now the interpreter is done with lookups and it sends
		                     the full concatenated string as output to 
		                     the log in system("GalTapsCow")
		                     This was also the last line of the function, so the interpreter can jump
		                     back out to where that function was called(6) and resume processing
		                     from there.
		                     Along with it the focal context will shift out to where it was then.*/
	};
	saga();                           /* 6. At this point we will have to do a lookup on the saga variable, in 
	                         order to know which function these parens are attempting to call. The interpreter
	                         handles this by checking whether the name saga has any meaning in the current
	                         execution context. the interpreter checks and finds that the saga variable is
	                         available locally in that scope. The value found there is a function object, and
	                         the parens next to the word saga tell the interpreter to invoke that function.*/
	saga();

}; 
newSaga();                               /* 3. Moving to running the newSaga(); function should have the effect
                          of creating a new executioncontext, so that it can make room for new variables that are 
                          local to that function.Now, this context will become the new current context
                          for as long as that function is running */

newSaga();


/* Difference between lexical scope and in-memory scope?

This starts to become clear when saga(); runs for the second time. the process we just went through will repeat,
but running saga a 2nd time will create a totally new execution context, instead of referencing the original
most inner context.This accomodates for storage of different bindings. As ever, the interpreter lookup focus
will also shift into the newly created context. The var declaration creates a new variable in this context
deep = "Tips". 
Given the current in-memory conditions, it will log: "GalTipsCow" (The variable lookups start from the current
context, the inner most, and scan out from there to any parent context)

With the inner function complete, the interpreter jumps back out to where that function was called and the current
context moves out as well. Furthermore this was all part of the fist call to newSaga, which is now completed.
Running newSaga function a second time (middle scope), will result in drafting a new, separate middle scope,
itself containing 2 two most inner scopes.
Almost all the exact same steps would occur, but the values would be different and it is stored in a new variable.
The 2 function objects were created by the same lines of code, but in 2 different invocations of the newSaga function.


