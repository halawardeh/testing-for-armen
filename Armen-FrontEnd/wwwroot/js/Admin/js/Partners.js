// بيانات مبدئية ثابتة
let companies = [
    {
        id: 1,
        name: "شركة DHL",
        logo: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
        showOnHomepage: true,
        description: "شركة شحن وتوصيل دولية",
        country: "دولية"
    },
    {
        id: 2,
        name: "شركة FedEx",
        logo: "https://cdn-icons-png.flaticon.com/512/732/732220.png",
        showOnHomepage: true,
        description: "شركة شحن وتوصيل دولية",
        country: "دولية"
    },
    {
        id: 3,
        name: "شركة UPS",
        logo: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
        showOnHomepage: false,
        description: "شركة شحن وتوصيل أمريكية",
        country: "دولية"
    },
    {
        id: 4,
        name: "شركة Aramex",
        logo: "https://cdn-icons-png.flaticon.com/512/732/732202.png",
        showOnHomepage: false,
        description: "شركة شحن وتوصيل الشرق الأوسط",
        country: "الإمارات"
    },
    {
        id: 5,
        name: "شركة TNT",
        logo: "https://cdn-icons-png.flaticon.com/512/732/732213.png",
        showOnHomepage: false,
        description: "شركة شحن دولية",
        country: "هولندا"
    }
];




function renderCompanies() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    companies.forEach((company, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${company.name}</td>
    <td><img src="${company.logo}" alt="شعار" style="max-height:40px;"></td>
    <td>${company.description || "-"}</td>
    <td>${company.showOnHomepage ? "نعم" : "لا"}</td>
    <td>${company.country || "-"}</td>
    <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editCompany(${company.id})">تعديل</button>
        <button class="btn btn-sm btn-danger" onclick="deleteCompany(${company.id})">حذف</button>
    </td>
`;

        tbody.appendChild(row);
    });
}

function addCompany() {
    const name = document.getElementById("companyName").value.trim();
    const logo = document.getElementById("companyLogo").value.trim();
    const showOnHomepage = document.getElementById("showOnHomepage").checked;
    const description = document.getElementById("companyDescription").value.trim();
    const country = document.getElementById("companyCountry").value.trim();

    if (!name || !logo) {
        alert("يرجى ملء الحقول الإلزامية.");
        return;
    }

    const newCompany = {
        id: Date.now(),
        name,
        logo,
        showOnHomepage,
        description,
        country
    };

    companies.push(newCompany);
    renderCompanies();

    // إعادة تعيين النموذج
    document.getElementById("addCompanyForm").reset();
    document.getElementById("logoPreview").style.display = "none";
    const modal = bootstrap.Modal.getInstance(document.getElementById("addCompanyModal"));
    modal.hide();
}

function editCompany(id) {
    const company = companies.find(c => c.id === id);
    if (!company) return;

    document.getElementById("editCompanyId").value = company.id;
    document.getElementById("editCompanyName").value = company.name;
    document.getElementById("editCompanyLogo").value = company.logo;
    document.getElementById("editShowOnHomepage").checked = company.showOnHomepage;
    document.getElementById("editCompanyDescription").value = company.description;
    document.getElementById("editCompanyCountry").value = company.country;
    document.getElementById("editLogoPreview").src = company.logo;
    document.getElementById("editLogoPreview").style.display = "block";

    const modal = new bootstrap.Modal(document.getElementById("editCompanyModal"));
    modal.show();
}

function saveCompany() {
    const id = parseInt(document.getElementById("editCompanyId").value);
    const name = document.getElementById("editCompanyName").value.trim();
    const logo = document.getElementById("editCompanyLogo").value.trim();
    const showOnHomepage = document.getElementById("editShowOnHomepage").checked;
    const description = document.getElementById("editCompanyDescription").value.trim();
    const country = document.getElementById("editCompanyCountry").value.trim();

    const index = companies.findIndex(c => c.id === id);
    if (index === -1) return;

    companies[index] = {
        id,
        name,
        logo,
        showOnHomepage,
        description,
        country
    };

    renderCompanies();

    const modal = bootstrap.Modal.getInstance(document.getElementById("editCompanyModal"));
    modal.hide();
}

function deleteCompany(id) {
    if (confirm("هل أنت متأكد من حذف هذه الشركة؟")) {
        companies = companies.filter(c => c.id !== id);
        renderCompanies();
    }
}

// عرض الشعار عند كتابة الرابط
document.getElementById("companyLogo").addEventListener("input", function () {
    const logoPreview = document.getElementById("logoPreview");
    const url = this.value.trim();
    if (url) {
        logoPreview.src = url;
        logoPreview.style.display = "block";
    } else {
        logoPreview.style.display = "none";
    }
});

document.getElementById("editCompanyLogo").addEventListener("input", function () {
    const logoPreview = document.getElementById("editLogoPreview");
    const url = this.value.trim();
    if (url) {
        logoPreview.src = url;
        logoPreview.style.display = "block";
    } else {
        logoPreview.style.display = "none";
    }
});

// تحميل البيانات المبدئية
document.addEventListener("DOMContentLoaded", renderCompanies);
