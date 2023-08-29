sh adb shell su -c "cat '{{ dir }}/{{ file }}' | gzip | base64" \
    | base64 -d | gzip -d '{{ file }}'
