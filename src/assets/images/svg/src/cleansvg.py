"""
Script to clean up all cruft which Inkscape inserts
into SVGs but Ionic does not like.
"""


import lxml
import re
import os
import sys

def main(args):
    """Main function."""

    in_file = args[0]
    out_file = args[1]

    with open(in_file, 'r') as file_in:
        contents = ' '.join(file_in.readlines()).replace('\n', ' ')

    # contents = contents.replace(r'(inkscape|sodipodi(?:[:a-zA-z0-9-_]+\s*=\s*"[^"]+"', '')
    # paths = re.findall(r'<path.*?svg-label="([^"]+)".*?>', contents)
    # for path in paths:
    #     print


if __name__ == '__main__':
    main(sys.argv[1:])