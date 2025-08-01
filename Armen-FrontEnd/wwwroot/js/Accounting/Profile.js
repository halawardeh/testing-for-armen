   AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-in-out',
        });

        let editMode = false;

        function toggleEditMode() {
            editMode = !editMode;
            const inputs = document.querySelectorAll('.form-input');
            const avatarContainer = document.querySelector('.avatar-container');
            const saveBtn = document.querySelector('.save-btn');
            const editBtn = document.querySelector('.edit-btn');
            const passwordGroup = document.querySelector('.password-group');

            if (editMode) {
                inputs.forEach(input => {
                    input.disabled = false;
                    input.classList.add('edit-mode');
                });

                avatarContainer.classList.add('edit-mode');
                passwordGroup.style.display = 'block';
                editBtn.innerHTML = '<i class="fas fa-times"></i> ????? ???????';
                saveBtn.style.display = 'inline-flex';
                inputs[0].focus();
            } else {
                inputs.forEach(input => {
                    input.disabled = true;
                    input.classList.remove('edit-mode');
                });

                avatarContainer.classList.remove('edit-mode');
                passwordGroup.style.display = 'none';
                editBtn.innerHTML = '<i class="fas fa-edit"></i> ????? ????? ??????';
                saveBtn.style.display = 'none';
            }
        }

        function handleAvatarUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.querySelector('.profile-avatar').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }

        function saveChanges() {
            const formData = new FormData();
            const inputs = document.querySelectorAll('.form-input:not([disabled])');

            inputs.forEach(input => {
                formData.append(input.name, input.value);
            });

            const avatarFile = document.querySelector('#avatarUpload').files[0];
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }

            console.log('Saving changes...', formData);

            Swal.fire({
                icon: 'success',
                title: '?? ?????',
                text: '?? ??? ????????? ?????!',
            });

            toggleEditMode();
        }

        document.addEventListener('DOMContentLoaded', function () {
            document.querySelector('.edit-btn').addEventListener('click', toggleEditMode);
            document.querySelector('#avatarUpload').addEventListener('change', handleAvatarUpload);

            console.log('Accounting Profile page loaded successfully');
        });