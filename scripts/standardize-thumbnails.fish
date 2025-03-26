#!/usr/bin/env fish

set base_dir assets/showcase-thumbnails

# Check if the directory exists
if not test -d $base_dir
    echo "Error: Directory $base_dir does not exist"
    exit 1
end

# Check if ImageMagick is installed
if not command -v convert >/dev/null
    echo "Error: ImageMagick is not installed. Please install it to convert images."
    echo "Try: brew install imagemagick (macOS) or apt-get install imagemagick (Ubuntu/Debian)"
    exit 1
end

# Loop through all directories matching the pattern
for dir in $base_dir/submission_*
    # Extract the ID number from the directory name
    set id (string replace -r "^$base_dir/submission_([0-9]+)\$" '$1' $dir)

    # Check if the ID was extracted correctly
    if test "$id" != "$dir"
        # Create the new directory name
        set new_dir "$base_dir/$id"

        # Rename the directory
        echo "Renaming directory $dir to $new_dir"
        mv $dir $new_dir
    end
end

# Now process all the renamed directories to standardize image files
for dir in $base_dir/*
    # Skip if not a directory
    if not test -d $dir
        continue
    end

    # Find the first image file in the directory
    set image_files (find $dir -type f -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.PNG" -o -name "*.gif" -o -name "*.webp" | head -n 1)

    if test -n "$image_files"
        set image_file $image_files[1]
        echo "Processing image: $image_file"

        # Check if it's already a PNG file
        if string match -q "*.png" $image_file
            # Just rename it to image.png
            echo "Renaming $image_file to $dir/image.png"
            mv $image_file $dir/image.png
        else
            # Convert to PNG and save as image.png
            echo "Converting $image_file to $dir/image.png"
            convert "$image_file" "$dir/image.png"
            # Remove the original file
            rm $image_file
        end
    else
        echo "No image files found in $dir"
    end
end

echo "Image standardization complete!"

# Now resize all images to exactly 300x200px with padding
echo "Starting image resizing..."
for dir in $base_dir/*
    # Skip if not a directory
    if not test -d $dir
        continue
    end

    set image_path "$dir/image.png"

    if test -f $image_path
        echo "Resizing $image_path to 300x200px with padding"
        # Resize image to fit within 300x200px while preserving aspect ratio
        # Then pad with white background to make it exactly 300x200px
        convert "$image_path" -resize "300x200>" -background white -gravity center -extent 300x200 "$image_path.tmp"
        mv "$image_path.tmp" "$image_path"
    else
        echo "Warning: $image_path not found"
    end
end

echo "Image processing complete!"
