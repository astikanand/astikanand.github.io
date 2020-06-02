# Crontab: Task Scheduling

#### List all the crontabs

```bash
crontab -l
```



#### Set a crontab

Open the crontab editor using

```bash
crontab -e
```

- Put the below lines  in the editor. 
- If it opens in `VIM` editore **press I to go to Insert Mode** and then enter. 
- To save the changes and come out of the editor press `ESC + : + w + q` .

```bash
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                       7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * *  command_to_execute


# Update the notes to GitHub everyday at 15:00
00 15 * * * sh /Users/astik.anand/OneDrive\ -\ Cotiviti/Notepads/update.sh

# Backup images to Google Drive every night at midnight 00:00
0 0 * * * rsync -a ~/Pictures/ ~/Google\ Drive/Pictures/
```



###### Check if crontab is set

```bash
crontab -l
```



#### Scripts to update:

```bash
cd /Users/astik.anand/OneDrive\ -\ Cotiviti/Notepads/
COMMIT_TIME=`date '+%A %d-%B-%Y at %I:%M %p'`
git add --a
git commit -m "Last updated on $COMMIT_TIME"
git push
```



#### Error Resolving

We may get the **error**:

```
fatal: could not read Username for 'https://github.com': Device not configured
```

**Solution:**

Solve the problem by updating the authentication via SSH instead of https:

```bash
# Earlier we had done using https
git remote add origin https://github.com/username/repo_name.git

# Now just update to ssh
git remote set-url origin git@github.com:username/repo_name.git
```

**Again we may get the error:**

```bash
Permission denied (publickey). fatal: Could not read from remote repository.
```

**Solution:**

```bash
# Generate SSH key using
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Copy the output of cat id_rsa.pub and Paste the above copied output into the 
Github profile -> Settings -> SSH and GPG Keys -> Add new SSH key
```







