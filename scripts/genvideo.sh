WHEREAMI="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $WHEREAMI

TALKERS=("dan" "emma" "kerry" "mark")
WORDS=($(cut -f1 word-list.txt))

echo "${#WORDS[@]} words"
echo "${#TALKERS[@]} talkers"

VIDEO=video

mkdir -p $VIDEO

for TALKER in "${TALKERS[@]}"
do
  rm -Rf $VIDEO/$TALKER
  mkdir -p $VIDEO/$TALKER
  (
    cd $VIDEO/$TALKER
    for WORD in "${WORDS[@]}"
    do
      for SECOND in {1..3}
      do
        FILENAME=$WORD-$SECOND
        convert -size 256x256 xc:grey $FILENAME.png
        convert -pointsize 24 -fill black \
          -draw 'text 24,32 "'"$TALKER"'"' \
          -draw 'text 24,128 "'"$WORD"'"' \
          -draw 'text 192,192 "'"$SECOND"'"' \
          $FILENAME.png $FILENAME.png
      done
      ffmpeg -hide_banner -loglevel panic -framerate 1 -i $WORD-%d.png  -c:v libx264 $WORD.mp4
      rm $WORD-*.png
    done
  )
done

