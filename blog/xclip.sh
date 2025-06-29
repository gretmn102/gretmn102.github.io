#!/bin/bash

# This replicates xclip functionality used by pass in Cygwin/MSYS2
# Original author: https://tylor.io/2015/07/13/password-manager/

while [[ $# > 0 ]]
do
  key="$1"

  case $key in
    -o|-out)
      OUT=1
      shift
      ;;
    *)
      shift
      ;;
  esac
done

# cp ./blog/xclip.sh $PREFIX/bin/xclip && chmod u+x $PREFIX/bin/xclip

if [[ $OUT -eq 0 ]]; then
  cat - | xargs -I {} am broadcast -a clipper.set -e text {} > /dev/null

  # am broadcast -a clipper.set -e text "this can be pasted now"
  # как передать данные `am broadcast` через pipe?
else
  am broadcast -a clipper.get | grep -oP '(?<=data=").*(?<!")'
  # echo 'data="hello"' | grep -oP '(?<=data=").*(?<!")'
fi
