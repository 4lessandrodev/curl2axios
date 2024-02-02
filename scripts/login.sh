#!/usr/bin/expect -f

set admin_user "admin"
set admin_password "admin"
set admin_email "dev@localhost.com"
set registry_url "http://localhost:4873/"

spawn npm login --registry=$registry_url

expect "Username: "
send "$admin_user\r"

expect "Password: "
send "$admin_password\r"

expect "Email: (this IS public) (dev@localhost.com)"
send "$admin_email\r"

expect {
    "Logged in on $registry_url." {
        send_user "Login bem-sucedido!\n"
    }
    timeout {
        send_user "Timeout: Falha ao fazer login.\n"
        exit 1
    }
}

expect eof
