## Solution Steps
* As the hint suggests, we will have to trick the database to log in as a different user with SQL injection
* Enter admin as the username
* Enter an SQL injection payload into the password field, such as 'OR 1==1;--
* Flag: `jctf{LOVE_ALL_TRUST_A_FEW_&_DO_WRONG_TO_NONE}`