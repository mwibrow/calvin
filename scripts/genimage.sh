WHEREAMI="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $WHEREAMI

readarray -t WORDS < word-list.txt

echo "${#WORDS[@]} words"

DIR=images

rm -Rf $DIR/words
mkdir -p $DIR/words
cd $DIR/words
for WORD in "${WORDS[@]}"
do
  FILENAME=$WORD
  convert -size 256x256 xc:grey $FILENAME.png
  convert -pointsize 24 -fill black -draw 'text 24,128 "'"$WORD"'"' \
    $FILENAME.png $FILENAME.png
done
