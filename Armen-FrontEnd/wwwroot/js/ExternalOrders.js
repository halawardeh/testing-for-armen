
    $(document).ready(function() {
        // Initialize Select2
        $('.select2').select2({
            placeholder: "اختر من القائمة",
            allowClear: true,
            language: {
                noResults: function () {
                    return "لا توجد نتائج";
                }
            }
        });

    // File preview functionality
    $('#orderFiles').change(function() {
        const files = this.files;
    const previewContainer = $('.file-preview');
    const previewContainerWrapper = $('.file-preview-container');

    previewContainer.empty();
        
        if (files.length > 0) {
        previewContainerWrapper.show();

    for (let i = 0; i < files.length; i++) {
            const file = files[i];
    const reader = new FileReader();

    reader.onload = function(e) {
        let previewHtml = '';

    if (file.type.match('image.*')) {
        previewHtml = `
                  <div class="file-preview-item">
                    <img src="${e.target.result}" alt="${file.name}">
                    <button type="button" class="remove-file" data-index="${i}">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                `;
              } else {
                const fileIcon = getFileIcon(file.type);
    previewHtml = `
    <div class="file-preview-item bg-light d-flex flex-column align-items-center justify-content-center">
        <i class="${fileIcon} fa-2x mb-2"></i>
        <small class="text-center">${file.name}</small>
        <button type="button" class="remove-file" data-index="${i}">
            <i class="fas fa-times"></i>
        </button>
    </div>
    `;
              }

    previewContainer.append(previewHtml);
            }

    reader.readAsDataURL(file);
          }
        } else {
        previewContainerWrapper.hide();
        }
      });

    // Remove file from preview and input
    $(document).on('click', '.remove-file', function() {
        const index = $(this).data('index');
    const input = $('#orderFiles')[0];
    const files = Array.from(input.files);

    files.splice(index, 1);

    // Create new DataTransfer and set files
    const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));

    // Update input files
    input.files = dataTransfer.files;

    // Trigger change event to update preview
    $(input).trigger('change');
      });

    // Form validation
    $('#externalOrderForm').submit(function(e) {
        e.preventDefault();

    const form = this;
    if (form.checkValidity() === false) {
        e.stopPropagation();
        } else {
        // Form is valid, proceed with submission
        alert('تم حفظ الطلب بنجاح!');
          // Here you would typically send the form data to the server
          // form.submit();
        }

    form.classList.add('was-validated');
      });

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    $('#orderDate').val(today);
    });

    // Helper function to get file icon based on type
    function getFileIcon(fileType) {
      if (fileType.match('application/pdf')) {
        return 'far fa-file-pdf text-danger';
      } else if (fileType.match('application/msword') || fileType.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        return 'far fa-file-word text-primary';
      } else if (fileType.match('application/vnd.ms-excel') || fileType.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        return 'far fa-file-excel text-success';
      } else {
        return 'far fa-file';
      }
    }
