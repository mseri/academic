#/usr/bin/env zsh

for i in $(ls **/*.htm*)
do
echo $i
echo
tidy -i --indent-spaces 2 -w 0 $i > $i.new
mv $i.new $i
done
