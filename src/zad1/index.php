<?php
declare(strict_types=1);

$filename = 'file.txt';
$targetName = 'file_shuffled.txt';

function shuffleFile(string $filePath, string $outputPath): void
{
    $lines = explode(PHP_EOL, file_get_contents($filePath));

    $output = array_map(
        static function (string $line): string {
            if (empty($line)) {
                return '';
            }

            $words = null;
            preg_match_all("/[a-zA-Z]{4,}/", $line, $words);

            foreach ($words[0] as $word) {
                $line = str_replace($word, mixWord($word), $line);
            }

            return $line;
        },
        $lines
    );

    file_put_contents($outputPath, implode(PHP_EOL, $output));
}

function mixWord(string $word): string
{
    $wordAsArray = str_split($word);

    $firstLetter = $wordAsArray[0];
    $lastLetter = $wordAsArray[count($wordAsArray) - 1];

    unset($wordAsArray[count($wordAsArray) - 1], $wordAsArray[0]);
    shuffle($wordAsArray);

    return $firstLetter.implode($wordAsArray).$lastLetter;
}

shuffleFile(__DIR__.'/'.$filename, __DIR__.'/'.$targetName);
