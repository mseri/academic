#/usr/bin/env zsh

for i in $(ls **/*.htm*)
do
tidy -i --indent-spaces 2 -w 0 --join-styles yes --join-classes yes $i > $i.new
mv $i.new $i
done
