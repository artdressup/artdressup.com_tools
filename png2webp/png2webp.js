const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 현재 디렉토리 경로
const currentDir = process.cwd();
const inputRootDir = 'input_png'
const outputRootDir = 'output_webp'

const pngPaths = [
    '01_body',
    '02_hat',
    '03_hair',
    '04_eyes',
    '05_glasses',
    '06_flush',
    '07_mouth',
    '08_shirts',
    '09_pants',
    '10_one-piece',
    '11_lHand',
    '12_rHand',
    '13_shoes',
    '14_wing',
    '15_background'
]


for (const dirPath of pngPaths) {
    const inputDir = path.join(currentDir, inputRootDir, dirPath)
    const outputDir = path.join(currentDir, outputRootDir, dirPath)

// 디렉토리 내의 파일 목록 가져오기
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        // PNG 파일 필터링
        const pngFiles = files.filter(file => path.extname(file) === '.png');

        // PNG 파일을 WebP 파일로 변환
        pngFiles.forEach(file => {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

            sharp(inputPath)
                .webp()
                .toFile(outputPath, (err, info) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    console.log(`Successfully converted ${file} to ${path.parse(file).name}.webp`);
                });
        });
    });
}
