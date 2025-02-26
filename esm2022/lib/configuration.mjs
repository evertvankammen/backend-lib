export class Configuration {
    constructor(configurationParameters = {}) {
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
        this.encoder = configurationParameters.encoder;
        if (configurationParameters.encodeParam) {
            this.encodeParam = configurationParameters.encodeParam;
        }
        else {
            this.encodeParam = param => this.defaultEncodeParam(param);
        }
        if (configurationParameters.credentials) {
            this.credentials = configurationParameters.credentials;
        }
        else {
            this.credentials = {};
        }
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param contentTypes - the array of content types that are available for selection
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderContentType(contentTypes) {
        if (contentTypes.length === 0) {
            return undefined;
        }
        const type = contentTypes.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    }
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderAccept(accepts) {
        if (accepts.length === 0) {
            return undefined;
        }
        const type = accepts.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    }
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    isJsonMime(mime) {
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
    lookupCredential(key) {
        const value = this.credentials[key];
        return typeof value === 'function'
            ? value()
            : value;
    }
    defaultEncodeParam(param) {
        // This implementation exists as fallback for missing configuration
        // and for backwards compatibility to older typescript-angular generator versions.
        // It only works for the 'simple' parameter style.
        // Date-handling only works for the 'date-time' format.
        // All other styles and Date-formats are probably handled incorrectly.
        //
        // But: if that's all you need (i.e.: the most common use-case): no need for customization!
        const value = param.dataFormat === 'date-time' && param.value instanceof Date
            ? param.value.toISOString()
            : param.value;
        return encodeURIComponent(String(value));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2JhY2tlbmQtbGliL3NyYy9saWIvY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQ0EsTUFBTSxPQUFPLGFBQWE7SUFnQ3RCLFlBQVksMEJBQW1ELEVBQUU7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7UUFDL0MsSUFBSSx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztRQUMzRCxDQUFDO2FBQ0ksQ0FBQztZQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELElBQUksdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7UUFDM0QsQ0FBQzthQUNJLENBQUM7WUFDRixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLHVCQUF1QixDQUFFLFlBQXNCO1FBQ2xELElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM1QixPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksa0JBQWtCLENBQUMsT0FBaUI7UUFDdkMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDckIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxVQUFVLENBQUMsSUFBWTtRQUMxQixNQUFNLFFBQVEsR0FBVyxJQUFJLE1BQU0sQ0FBQywrREFBK0QsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRyxPQUFPLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxHQUFXO1FBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVO1lBQzlCLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDVCxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hCLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxLQUFZO1FBQ25DLG1FQUFtRTtRQUNuRSxrRkFBa0Y7UUFDbEYsa0RBQWtEO1FBQ2xELHVEQUF1RDtRQUN2RCxzRUFBc0U7UUFDdEUsRUFBRTtRQUNGLDJGQUEyRjtRQUUzRixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsS0FBSyxZQUFZLElBQUk7WUFDekUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxLQUFjLENBQUMsV0FBVyxFQUFFO1lBQ3JDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBRWxCLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFBhcmFtZXRlckNvZGVjIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUGFyYW0gfSBmcm9tICcuL3BhcmFtJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0aW9uUGFyYW1ldGVycyB7XG4gICAgLyoqXG4gICAgICogIEBkZXByZWNhdGVkIFNpbmNlIDUuMC4gVXNlIGNyZWRlbnRpYWxzIGluc3RlYWRcbiAgICAgKi9cbiAgICBhcGlLZXlzPzoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nfTtcbiAgICB1c2VybmFtZT86IHN0cmluZztcbiAgICBwYXNzd29yZD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiAgQGRlcHJlY2F0ZWQgU2luY2UgNS4wLiBVc2UgY3JlZGVudGlhbHMgaW5zdGVhZFxuICAgICAqL1xuICAgIGFjY2Vzc1Rva2VuPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XG4gICAgYmFzZVBhdGg/OiBzdHJpbmc7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUYWtlcyBjYXJlIG9mIGVuY29kaW5nIHF1ZXJ5LSBhbmQgZm9ybS1wYXJhbWV0ZXJzLlxuICAgICAqL1xuICAgIGVuY29kZXI/OiBIdHRwUGFyYW1ldGVyQ29kZWM7XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgbWV0aG9kIGZvciBlbmNvZGluZyBwYXRoIHBhcmFtZXRlcnMgaW4gdmFyaW91c1xuICAgICAqIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vT0FJL09wZW5BUEktU3BlY2lmaWNhdGlvbi9ibG9iL21haW4vdmVyc2lvbnMvMy4xLjAubWQjc3R5bGUtdmFsdWVzXCI+c3R5bGVzPC9hPi5cbiAgICAgKiA8cD5cbiAgICAgKiBTZWUge0BsaW5rIFJFQURNRS5tZH0gZm9yIG1vcmUgZGV0YWlsc1xuICAgICAqIDwvcD5cbiAgICAgKi9cbiAgICBlbmNvZGVQYXJhbT86IChwYXJhbTogUGFyYW0pID0+IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUga2V5cyBhcmUgdGhlIG5hbWVzIGluIHRoZSBzZWN1cml0eVNjaGVtZXMgc2VjdGlvbiBvZiB0aGUgT3BlbkFQSVxuICAgICAqIGRvY3VtZW50LiBUaGV5IHNob3VsZCBtYXAgdG8gdGhlIHZhbHVlIHVzZWQgZm9yIGF1dGhlbnRpY2F0aW9uXG4gICAgICogbWludXMgYW55IHN0YW5kYXJkIHByZWZpeGVzIHN1Y2ggYXMgJ0Jhc2ljJyBvciAnQmVhcmVyJy5cbiAgICAgKi9cbiAgICBjcmVkZW50aWFscz86IHtbIGtleTogc3RyaW5nIF06IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQpfTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb24ge1xuICAgIC8qKlxuICAgICAqICBAZGVwcmVjYXRlZCBTaW5jZSA1LjAuIFVzZSBjcmVkZW50aWFscyBpbnN0ZWFkXG4gICAgICovXG4gICAgYXBpS2V5cz86IHtbIGtleTogc3RyaW5nIF06IHN0cmluZ307XG4gICAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogIEBkZXByZWNhdGVkIFNpbmNlIDUuMC4gVXNlIGNyZWRlbnRpYWxzIGluc3RlYWRcbiAgICAgKi9cbiAgICBhY2Nlc3NUb2tlbj86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xuICAgIGJhc2VQYXRoPzogc3RyaW5nO1xuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGFrZXMgY2FyZSBvZiBlbmNvZGluZyBxdWVyeS0gYW5kIGZvcm0tcGFyYW1ldGVycy5cbiAgICAgKi9cbiAgICBlbmNvZGVyPzogSHR0cFBhcmFtZXRlckNvZGVjO1xuICAgIC8qKlxuICAgICAqIEVuY29kaW5nIG9mIHZhcmlvdXMgcGF0aCBwYXJhbWV0ZXJcbiAgICAgKiA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL09BSS9PcGVuQVBJLVNwZWNpZmljYXRpb24vYmxvYi9tYWluL3ZlcnNpb25zLzMuMS4wLm1kI3N0eWxlLXZhbHVlc1wiPnN0eWxlczwvYT4uXG4gICAgICogPHA+XG4gICAgICogU2VlIHtAbGluayBSRUFETUUubWR9IGZvciBtb3JlIGRldGFpbHNcbiAgICAgKiA8L3A+XG4gICAgICovXG4gICAgZW5jb2RlUGFyYW06IChwYXJhbTogUGFyYW0pID0+IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUga2V5cyBhcmUgdGhlIG5hbWVzIGluIHRoZSBzZWN1cml0eVNjaGVtZXMgc2VjdGlvbiBvZiB0aGUgT3BlbkFQSVxuICAgICAqIGRvY3VtZW50LiBUaGV5IHNob3VsZCBtYXAgdG8gdGhlIHZhbHVlIHVzZWQgZm9yIGF1dGhlbnRpY2F0aW9uXG4gICAgICogbWludXMgYW55IHN0YW5kYXJkIHByZWZpeGVzIHN1Y2ggYXMgJ0Jhc2ljJyBvciAnQmVhcmVyJy5cbiAgICAgKi9cbiAgICBjcmVkZW50aWFsczoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nIHwgKCgpID0+IHN0cmluZyB8IHVuZGVmaW5lZCl9O1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlndXJhdGlvblBhcmFtZXRlcnM6IENvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0ge30pIHtcbiAgICAgICAgdGhpcy5hcGlLZXlzID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuYXBpS2V5cztcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLnVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMucGFzc3dvcmQ7XG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5hY2Nlc3NUb2tlbjtcbiAgICAgICAgdGhpcy5iYXNlUGF0aCA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmJhc2VQYXRoO1xuICAgICAgICB0aGlzLndpdGhDcmVkZW50aWFscyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgdGhpcy5lbmNvZGVyID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuZW5jb2RlcjtcbiAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmVuY29kZVBhcmFtKSB7XG4gICAgICAgICAgICB0aGlzLmVuY29kZVBhcmFtID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuZW5jb2RlUGFyYW07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVuY29kZVBhcmFtID0gcGFyYW0gPT4gdGhpcy5kZWZhdWx0RW5jb2RlUGFyYW0ocGFyYW0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uUGFyYW1ldGVycy5jcmVkZW50aWFscykge1xuICAgICAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmNyZWRlbnRpYWxzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IHRoZSBjb3JyZWN0IGNvbnRlbnQtdHlwZSB0byB1c2UgZm9yIGEgcmVxdWVzdC5cbiAgICAgKiBVc2VzIHtAbGluayBDb25maWd1cmF0aW9uI2lzSnNvbk1pbWV9IHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBjb250ZW50LXR5cGUuXG4gICAgICogSWYgbm8gY29udGVudCB0eXBlIGlzIGZvdW5kIHJldHVybiB0aGUgZmlyc3QgZm91bmQgdHlwZSBpZiB0aGUgY29udGVudFR5cGVzIGlzIG5vdCBlbXB0eVxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZXMgLSB0aGUgYXJyYXkgb2YgY29udGVudCB0eXBlcyB0aGF0IGFyZSBhdmFpbGFibGUgZm9yIHNlbGVjdGlvblxuICAgICAqIEByZXR1cm5zIHRoZSBzZWxlY3RlZCBjb250ZW50LXR5cGUgb3IgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpZiBubyBzZWxlY3Rpb24gY291bGQgYmUgbWFkZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0SGVhZGVyQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlczogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoY29udGVudFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHR5cGUgPSBjb250ZW50VHlwZXMuZmluZCgoeDogc3RyaW5nKSA9PiB0aGlzLmlzSnNvbk1pbWUoeCkpO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudFR5cGVzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgY29ycmVjdCBhY2NlcHQgY29udGVudC10eXBlIHRvIHVzZSBmb3IgYSByZXF1ZXN0LlxuICAgICAqIFVzZXMge0BsaW5rIENvbmZpZ3VyYXRpb24jaXNKc29uTWltZX0gdG8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGFjY2VwdCBjb250ZW50LXR5cGUuXG4gICAgICogSWYgbm8gY29udGVudCB0eXBlIGlzIGZvdW5kIHJldHVybiB0aGUgZmlyc3QgZm91bmQgdHlwZSBpZiB0aGUgY29udGVudFR5cGVzIGlzIG5vdCBlbXB0eVxuICAgICAqIEBwYXJhbSBhY2NlcHRzIC0gdGhlIGFycmF5IG9mIGNvbnRlbnQgdHlwZXMgdGhhdCBhcmUgYXZhaWxhYmxlIGZvciBzZWxlY3Rpb24uXG4gICAgICogQHJldHVybnMgdGhlIHNlbGVjdGVkIGNvbnRlbnQtdHlwZSBvciA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IGlmIG5vIHNlbGVjdGlvbiBjb3VsZCBiZSBtYWRlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RIZWFkZXJBY2NlcHQoYWNjZXB0czogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoYWNjZXB0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0eXBlID0gYWNjZXB0cy5maW5kKCh4OiBzdHJpbmcpID0+IHRoaXMuaXNKc29uTWltZSh4KSk7XG4gICAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2NlcHRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiBNSU1FIGlzIGEgSlNPTiBNSU1FLlxuICAgICAqIEpTT04gTUlNRSBleGFtcGxlczpcbiAgICAgKiAgIGFwcGxpY2F0aW9uL2pzb25cbiAgICAgKiAgIGFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGOFxuICAgICAqICAgQVBQTElDQVRJT04vSlNPTlxuICAgICAqICAgYXBwbGljYXRpb24vdm5kLmNvbXBhbnkranNvblxuICAgICAqIEBwYXJhbSBtaW1lIC0gTUlNRSAoTXVsdGlwdXJwb3NlIEludGVybmV0IE1haWwgRXh0ZW5zaW9ucylcbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIGdpdmVuIE1JTUUgaXMgSlNPTiwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBpc0pzb25NaW1lKG1pbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBqc29uTWltZTogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXihhcHBsaWNhdGlvblxcL2pzb258W147LyBcXHRdK1xcL1teOy8gXFx0XStbK11qc29uKVsgXFx0XSooOy4qKT8kJywgJ2knKTtcbiAgICAgICAgcmV0dXJuIG1pbWUgIT09IG51bGwgJiYgKGpzb25NaW1lLnRlc3QobWltZSkgfHwgbWltZS50b0xvd2VyQ2FzZSgpID09PSAnYXBwbGljYXRpb24vanNvbi1wYXRjaCtqc29uJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvb2t1cENyZWRlbnRpYWwoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY3JlZGVudGlhbHNba2V5XTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyB2YWx1ZSgpXG4gICAgICAgICAgICA6IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdEVuY29kZVBhcmFtKHBhcmFtOiBQYXJhbSk6IHN0cmluZyB7XG4gICAgICAgIC8vIFRoaXMgaW1wbGVtZW50YXRpb24gZXhpc3RzIGFzIGZhbGxiYWNrIGZvciBtaXNzaW5nIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgLy8gYW5kIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB0byBvbGRlciB0eXBlc2NyaXB0LWFuZ3VsYXIgZ2VuZXJhdG9yIHZlcnNpb25zLlxuICAgICAgICAvLyBJdCBvbmx5IHdvcmtzIGZvciB0aGUgJ3NpbXBsZScgcGFyYW1ldGVyIHN0eWxlLlxuICAgICAgICAvLyBEYXRlLWhhbmRsaW5nIG9ubHkgd29ya3MgZm9yIHRoZSAnZGF0ZS10aW1lJyBmb3JtYXQuXG4gICAgICAgIC8vIEFsbCBvdGhlciBzdHlsZXMgYW5kIERhdGUtZm9ybWF0cyBhcmUgcHJvYmFibHkgaGFuZGxlZCBpbmNvcnJlY3RseS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQnV0OiBpZiB0aGF0J3MgYWxsIHlvdSBuZWVkIChpLmUuOiB0aGUgbW9zdCBjb21tb24gdXNlLWNhc2UpOiBubyBuZWVkIGZvciBjdXN0b21pemF0aW9uIVxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFyYW0uZGF0YUZvcm1hdCA9PT0gJ2RhdGUtdGltZScgJiYgcGFyYW0udmFsdWUgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgICA/IChwYXJhbS52YWx1ZSBhcyBEYXRlKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICA6IHBhcmFtLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxufVxuIl19