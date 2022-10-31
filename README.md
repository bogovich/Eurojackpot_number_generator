# Eurojackpot_number_generator

https://bogovich.github.io/Eurojackpot_number_generator/

## Project description

Simple, mobile-friendly, responsive number generator for EuroJackpot. Built with pure JS, CSS and HTML. 
Applied DOM manipulation, array and object methods, events, localStorage persistence, flex and grid layouts.

### Algorithm

The numbers are generated according to combinatorial patterns, i.e., "odd-even" and "low-high" combination patterns (low < 25, high > =25), and not simply selected at random from the range 1-50. 
These combinatorial patterns have better odds, i.e., the ratio of success to failure is more favourable than for other combinatorial patterns. 
The odd-even combinatorial pattern with the highest odds contains 3 odd numbers and 2 even numbers or vice versa. The low-high combinatorial pattern with the highest odds contains 3 low numbers and 2 high numbers, or vice versa. The numbers are generated in four different approaches containing these combinatorial patterns, where the approach is chosen randomly 

The choice of these combinatorial patterns does not increase the chances of winning, as all combinations have the same probability.

The script generates 5 standard numbers + 2 euro numbers.
The five standard numbers should have a sum between LOW_SUM_LIMIT and HIGH_SUM_LIMIT, except for the sums in avoidSum.


[More about generator's logic](https://lotterycodex.com/eurojackpot-550/)
